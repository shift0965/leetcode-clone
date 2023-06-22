import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { WEB_SOCKET_URL } from "../../api.const";

interface PlayersJoiningProps {
  roomId: number | undefined;
}

const PlayersJoining = ({ roomId }: PlayersJoiningProps) => {
  const socket = useRef(io(WEB_SOCKET_URL)).current;
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("host-playerJoinRoom", function (playerName: string) {
      setPlayers((prev) => [...prev, playerName]);
    });
  }, []);

  return (
    <div className="w-11/12 md:w-9/12 mx-auto mt-8 text-dark-gray-8">
      <div>
        <h1 className=" text-2xl">
          ROOM ID : <strong>{roomId}</strong>
        </h1>
      </div>
      <div className="mt-5">
        <h1 className="text-lg">Players:</h1>
        {players.map((player) => (
          <div>{player}</div>
        ))}
      </div>
    </div>
  );
};

export default PlayersJoining;
