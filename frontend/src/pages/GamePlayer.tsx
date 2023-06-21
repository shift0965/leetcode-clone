import { Player_JOIN_ROOM } from "../api.const";
import { useEffect, useState } from "react";

const GamePlayer = () => {
  const [userName, setUserName] = useState<string>();
  const [roomId, setRoomId] = useState<string>();

  const handleJoinRoom = () => {
    fetch(Player_JOIN_ROOM, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        roomId: roomId,
        userName: userName,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div>
      <div>
        <div className="">
          <label>RoomId: </label>
          <input
            type="text"
            className="border-2"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>
        <div className="">
          <label>UserName: </label>
          <input
            type="text"
            className="border-2"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <button
          onClick={handleJoinRoom}
          className=" bg-gray-200 px-5 py-2 rounded-lg"
        >
          JoinRoom
        </button>
      </div>
    </div>
  );
};

export default GamePlayer;
