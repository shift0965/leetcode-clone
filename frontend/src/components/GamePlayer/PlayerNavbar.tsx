import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GET_TIME_LIMIT, PLAYER_AVATAR_URL } from "../../api.const";
import { GamePlayerState, Player } from "../../types.const";
import { PLAYER_EXIT_GAME } from "../../api.const";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CountDown from "../NavBars/CountDown";

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
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const navigate = useNavigate();
  const handleExitGame = () => {
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
      navigate("/");
    }
  };

  useEffect(() => {
    if (currentState === "GamePlaying" && player) {
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
    }
  }, [currentState]);

  return (
    <nav className="relative flex h-12 w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div className="flex w-full items-center justify-between">
        <div className="flex-1 h-[22px]">
          <Link to="/" className=" h-full block w-32">
            <img src="/logo-full.png" alt="Logo" className="h-full" />
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
              <CountDown timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
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
    </nav>
  );
};
export default PlayerNavbar;
