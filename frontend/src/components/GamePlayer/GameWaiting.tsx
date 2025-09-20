import { Player, GamePlayerState, ProblemDetails } from "../../types.const";
import { contestApi, WEB_SOCKET_URL } from "../../api";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PlayersLobby from "../GameHost/PlayersLobby";
import { motion as m } from "framer-motion";

interface GameWaitingProps {
  player: Player | undefined;
  gameId: number | undefined;
  setCurrentState: React.Dispatch<React.SetStateAction<GamePlayerState>>;
}
const GameWaiting = ({ player, setCurrentState, gameId }: GameWaitingProps) => {
  const socket = useRef(io(WEB_SOCKET_URL)).current;
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (player) {
      contestApi.getPlayers({ gameId: player.gameId })
        .then((results) => {
          setPlayers(results.players);
        });

      //clean local storage
      contestApi.getProblems({ gameId: player.gameId })
        .then((data) => {
          data.problems.forEach((problem: ProblemDetails) => {
            localStorage.removeItem(`code?problem_id=${problem?.id}&gameMode`);
          });
        });

      socket.emit("ws-player-joinGame", { gameId: player.gameId });
      socket.on(
        "ws-host-playerJoinGame",
        function (newPlayer: { id: number; name: string }) {
          setPlayers((prev) => [
            ...prev,
            { id: newPlayer.id, name: newPlayer.name, gameId: player.gameId },
          ]);
        }
      );
      socket.on(
        "ws-host-playerExitGame",
        function (exitedPlayer: { id: number }) {
          setPlayers((prev) =>
            prev.filter((player) => player.id != exitedPlayer.id)
          );
        }
      );

      socket.on("ws-player-hostTerminateGame", function () {
        toast.info("Host terminated game");
        localStorage.removeItem("playerData");
        navigate("/");
      });

      socket.on("ws-player-hostStartGame", function () {
        toast("🔥 Game Started !");
        setCurrentState("GamePlaying");
      });

      return () => {
        socket.off("ws-host-playerExitGame");
        socket.off("ws-host-playerJoinGame");
        socket.off("ws-player-hostTerminateGame");
        socket.off("ws-player-hostStartGame");
      };
    }
  }, [socket]);

  return (
    <m.div
      className="mx-auto text-dark-gray-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-12">
        <h1 className="blink text-xl text-center text-dark-gray-7">
          Game <strong className=" text-dark-pink mx-1">{gameId}</strong> is
          about to start...
        </h1>
        <div className="mt-2">
          <PlayersLobby players={players} />
        </div>
      </div>
    </m.div>
  );
};

export default GameWaiting;
