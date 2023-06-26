import { Player } from "../../types.const";
import { GET_CONTEST_PLAYERS, WEB_SOCKET_URL } from "../../api.const";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PlayersLobby from "../GameHost/PlayersLobby";

interface GameWaitingProps {
  player: Player | undefined;
}
const GameWaiting = ({ player }: GameWaitingProps) => {
  const socket = useRef(io(WEB_SOCKET_URL)).current;
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (player) {
      fetch(GET_CONTEST_PLAYERS, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contestId: player.gameId,
        }),
      })
        .then((response) => response.json())
        .then((results) => {
          setPlayers(results.players);
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
          console.log("Leaved");
        }
      );
      socket.on("ws-player-hostTerminateGame", function () {
        toast.info("Host terminated game");
        localStorage.removeItem("playerData");
        navigate("/");
      });

      return () => {
        socket.off("ws-host-playerExitGame");
        socket.off("ws-host-playerJoinGame");
        socket.off("ws-player-hostTerminateGame");
      };
    }
  }, []);

  return (
    <div className="w-11/12 md:w-9/12 mx-auto text-dark-gray-8">
      <div className="mt-10">
        <h1 className="blink text-xl text-center text-dark-gray-7">
          Game is about to start...
        </h1>
        <div className="mt-16">
          <PlayersLobby players={players} />
        </div>
      </div>
    </div>
  );
};

export default GameWaiting;
