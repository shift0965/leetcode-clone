import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { contestApi, WEB_SOCKET_URL } from "../../api";
import { Player } from "../../types.const";
import PlayersLobby from "./PlayersLobby";
import { motion as m } from "framer-motion";

interface PlayersJoiningProps {
  gameId: number | undefined;
}

const PlayersJoining = ({ gameId }: PlayersJoiningProps) => {
  const socket = useRef(io(WEB_SOCKET_URL)).current;
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (gameId) {
      contestApi.getPlayers({ gameId: gameId })
        .then((results) => {
          setPlayers(results.players);
        });

      socket.emit("ws-host-joinGame", { gameId: gameId });
      socket.on(
        "ws-host-playerJoinGame",
        function (newPlayer: { id: number; name: string }) {
          setPlayers((prev) => [
            ...prev,
            { id: newPlayer.id, name: newPlayer.name, gameId: gameId },
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

      return () => {
        socket.off("ws-host-playerExitGame");
        socket.off("ws-host-playerJoinGame");
      };
    }
  }, [gameId, socket]);

  return (
    <m.div
      className="text-dark-gray-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-12">
        <h1 className="text-4xl text-center">
          Game Id -{" "}
          <strong className=" text-dark-pink" id="game-id">
            {gameId}
          </strong>
        </h1>
        <h1 className="blink text-xl text-center text-dark-gray-7 mt-6">
          Waiting For Players To Join...
        </h1>
        <div className="mt-2">
          <PlayersLobby players={players} />
        </div>
      </div>
    </m.div>
  );
};

export default PlayersJoining;
