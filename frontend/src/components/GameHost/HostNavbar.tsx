import { FiTriangle, FiCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  HOST_SHOT_DOWN,
  HOST_START_GAME,
  GET_TIME_LIMIT,
  HOST_CLOSE_GAME,
} from "../../api.const";
import { toast } from "react-toastify";
import { GameHostState } from "../../types.const";
import { useEffect, useState } from "react";
import CountDown from "../NavBars/CountDown";

interface HostNavbarProps {
  gameId: number | undefined;
  currentState: GameHostState;
  setCurrentState: React.Dispatch<React.SetStateAction<GameHostState>>;
}

const HostNavbar = ({
  gameId,
  currentState,
  setCurrentState,
}: HostNavbarProps) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number>();

  useEffect(() => {
    if (currentState === "GameWatching" && gameId) {
      fetch(GET_TIME_LIMIT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          gameId: gameId,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          const msLeft = result.endedAt - new Date().getTime();
          console.log(msLeft);
          setTimeLeft(Math.floor(msLeft / 1000));
        });
    }
  }, [currentState, gameId]);

  const handleStartGame = () => {
    const userDataJSON = localStorage.getItem("userData");
    if (userDataJSON && gameId) {
      const userToken = JSON.parse(userDataJSON).access_token;
      fetch(HOST_START_GAME, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          gameId: gameId,
        }),
      }).then((response) => {
        if (response.status === 200) {
          toast("🔥 Game Started !");
        } else {
          toast.error("Start Game failed");
        }
      });
      setCurrentState("GameWatching");
    }
  };

  const handleShotDown = () => {
    const userDataJSON = localStorage.getItem("userData");
    if (userDataJSON && gameId) {
      const userToken = JSON.parse(userDataJSON).access_token;
      fetch(HOST_SHOT_DOWN, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          gameId: gameId,
        }),
      }).then((response) => {
        if (response.status === 200) {
          navigate("/");
        } else {
          toast.error("Shot down failed");
        }
      });
    }
  };

  const handleCloseGame = () => {
    const userDataJSON = localStorage.getItem("userData");
    if (userDataJSON && gameId) {
      const userToken = JSON.parse(userDataJSON).access_token;
      fetch(HOST_CLOSE_GAME, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          gameId: gameId,
        }),
      }).then((response) => {
        if (response.status === 200) {
          setCurrentState("GameResult");
        } else {
          navigate("/");
        }
      });
    }
  };

  useEffect(() => {
    if (currentState === "GameWatching" && timeLeft && timeLeft === 0) {
      setCurrentState("GameResult");
    }
  }, [timeLeft, currentState]);

  return (
    <nav className="relative flex h-12 w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div className="flex w-full items-center justify-between">
        <div className="flex-1 h-[22px]">
          <Link to="/" className=" h-full block w-32">
            <img src="/logo-full.png" alt="Logo" className="h-full" />
          </Link>
        </div>

        <div className="relative h-11 border-white flex-1 flex justify-center">
          <img src="./gameHost.png" alt="user" className=" h-full"></img>
          <div className="flex items-center ml-2 text-lg text-dark-gray-8">
            HOST
          </div>
        </div>
        <div className="flex items-center space-x-4 flex-1 justify-end">
          {currentState === "GameWatching" && timeLeft && (
            <CountDown timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
          )}
          {currentState === "PlayersJoining" && (
            <div
              className="flex items-center bg-dark-fill-3 py-1 px-3 cursor-pointer rounded text-dark-green-s font-medium hover:bg-dark-fill-2 transition-all shrink-0 whitespace-nowrap"
              onClick={handleStartGame}
            >
              <div className="mr-2">Start Game</div>
              <FiCircle />
            </div>
          )}
          {currentState === "GameWatching" && (
            <button
              className="flex items-center bg-dark-fill-3 py-1 px-3 cursor-pointer rounded text-dark-yellow font-medium hover:bg-dark-fill-2 transition-all shrink-0 whitespace-nowrap"
              onClick={handleCloseGame}
            >
              <div className="mr-2">Close Game</div>
              <FiCircle />
            </button>
          )}
          {currentState === "PlayersJoining" && (
            <button
              className="flex items-center bg-dark-fill-3 py-1 px-3 cursor-pointer rounded text-dark-pink font-medium hover:bg-dark-fill-2 transition-all shrink-0 whitespace-nowrap"
              onClick={handleShotDown}
            >
              <div className="mr-2">Shut Down</div>
              <FiTriangle />
            </button>
          )}
          {currentState === "GameResult" && (
            <button
              className="flex items-center bg-dark-fill-3 py-1 px-3 cursor-pointer rounded text-dark-pink font-medium hover:bg-dark-fill-2 transition-all shrink-0 whitespace-nowrap"
              onClick={handleShotDown}
            >
              <div className="mr-2">Leave</div>
              <FiTriangle />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
export default HostNavbar;
