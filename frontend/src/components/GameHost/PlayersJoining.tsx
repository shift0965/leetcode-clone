import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { GET_CONTEST_PLAYERS, WEB_SOCKET_URL } from "../../api.const";
import { Player } from "../../types.const";
import PlayersLobby from "./PlayersLobby";

interface PlayersJoiningProps {
  gameId: number | undefined;
}

const PlayersJoining = ({ gameId }: PlayersJoiningProps) => {
  const socket = useRef(io(WEB_SOCKET_URL)).current;
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (gameId) {
      fetch(GET_CONTEST_PLAYERS, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contestId: gameId,
        }),
      })
        .then((response) => response.json())
        .then((results) => {
          setPlayers(results.players);
        });

      socket.emit("ws-host-createGame", { gameId: gameId });
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
          console.log("Leaved");
        }
      );

      return () => {
        socket.off("ws-host-playerExitGame");
        socket.off("ws-host-playerJoinGame");
      };
    }
  }, [gameId]);

  return (
    <div className="text-dark-gray-8">
      <div className="mt-14">
        <h1 className="text-4xl text-center">
          Game Id - <strong className=" text-dark-pink">{gameId}</strong>
        </h1>
        <h1 className="blink text-xl text-center text-dark-gray-7 mt-6">
          Waiting For Players To Join...
        </h1>
      </div>
      <div className=" mt-16">
        <PlayersLobby players={players} />
      </div>
    </div>
  );
};

export default PlayersJoining;

// ${id === 12 && " ml-[306px]"}
