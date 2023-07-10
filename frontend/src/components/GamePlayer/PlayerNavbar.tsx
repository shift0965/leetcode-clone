import { FiLogOut } from "react-icons/fi";
import { GiBulletBill } from "react-icons/gi";
import { BsSlashLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GET_TIME_LIMIT, PLAYER_AVATAR_URL } from "../../api.const";
import { GamePlayerState, Player } from "../../types.const";
import { PLAYER_EXIT_GAME } from "../../api.const";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CountDown from "../NavBars/CountDown";
import { useRecoilState } from "recoil";
import { bulletSwitchState } from "../../atoms/stateAtoms";
import { motion as m } from "framer-motion";

interface PlayerNavbarProps {
  player: Player | undefined;
  currentState: GamePlayerState;
  setCurrentState: React.Dispatch<React.SetStateAction<GamePlayerState>>;
}

const PlayerNavbar = ({
  player,
  currentState,
  setCurrentState,
}: PlayerNavbarProps) => {
  const [timeLeft, setTimeLeft] = useState<number>();
  const [bulletSwitch, setBulletSwitch] = useRecoilState(bulletSwitchState);

  const navigate = useNavigate();
  const handleExitGame = () => {
    if (currentState === "GamePlaying" || currentState === "GameWaiting")
      if (player) {
        fetch(PLAYER_EXIT_GAME, {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            gameId: player.gameId,
            playerId: player.id,
          }),
        });
        localStorage.removeItem("playerData");
      }
    localStorage.removeItem("playerData");
    navigate("/");
  };

  useEffect(() => {
    if (currentState === "GamePlaying" && player) {
      const fetchTime = () => {
        fetch(GET_TIME_LIMIT, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            gameId: player.gameId,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            const msLeft = result.endedAt - new Date().getTime();
            setTimeLeft(Math.floor(msLeft / 1000));
          });
      };
      fetchTime();
      const intervalId = setInterval(() => {
        fetchTime();
      }, 60000);
      return () => clearInterval(intervalId);
    }
  }, [currentState, player]);

  useEffect(() => {
    if (currentState === "GamePlaying" && timeLeft && timeLeft <= 0) {
      setCurrentState("GameResult");
    }
  }, [timeLeft, currentState]);

  return (
    <m.nav
      className="relative flex h-12 w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex-1 flex items-center text-white text-lg">
          <Link to="/" className=" block w-[100px]">
            <img src="/logo-full.png" alt="Logo" className=" w-full" />
          </Link>
        </div>

        {player && (
          <>
            <div className="relative h-10 border-white flex-1 flex justify-center">
              <img
                src={`${PLAYER_AVATAR_URL}&seed=${player.name}`}
                alt="user"
                className=" h-full"
              ></img>
              <div className="flex items-center ml-2 text-lg text-dark-gray-8">
                {player.name}
              </div>
            </div>
            <div className="flex items-center space-x-4 flex-1 justify-end">
              {currentState === "GamePlaying" && (
                <div
                  className="text-xl relative cursor-pointer flex h-9 w-9  justify-center items-center"
                  title={`${
                    bulletSwitch ? "Turn off bullets" : "Turn on bullets"
                  }`}
                  onClick={() => {
                    setBulletSwitch((prev) => !prev);
                  }}
                >
                  <div
                    className={`absolute text-dark-gray-6 text-3xl top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2
                            ${
                              bulletSwitch ? "opacity-0" : "opacity-100"
                            } transition-all`}
                  >
                    <BsSlashLg />
                  </div>
                  <GiBulletBill />
                </div>
              )}
              {currentState === "GamePlaying" && timeLeft && (
                <CountDown timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
              )}

              <button
                className="flex items-center bg-dark-fill-3 py-1 px-3 cursor-pointer rounded text-dark-pink hover:bg-dark-fill-2 transition-all"
                onClick={handleExitGame}
              >
                <div className="mr-2">Exit</div>
                <FiLogOut />
              </button>
            </div>
          </>
        )}
      </div>
    </m.nav>
  );
};
export default PlayerNavbar;
