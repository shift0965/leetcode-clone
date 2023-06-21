import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

import { WEB_SOCKET_URL } from "../../api.const";

const JoinGame = () => {
  const [userName, setUserName] = useState<string>();
  const [roomId, setRoomId] = useState<string>();
  // const socket = useRef(io(WEB_SOCKET_URL)).current;

  // useEffect(() => {
  //   socket.emit("host-JoinRoom", roomId);
  //   // socket.on("host-PlayerList", function (playerListData) {
  //   //   console.log(playerListData);
  //   // });
  //   socket.on("host-Connected", function (message) {
  //     console.log(message);
  //   });
  // }, []);

  // const sendMessage = () => {
  //   socket.emit("player-send-me-message");
  // };

  // const handleJoinRooom = () => {
  //   // setIsWaiting(true);
  //   socket.emit("player-JoinRoom", {
  //     roomId: roomId,
  //     userName: userName,
  //   });
  //   // socket.on("player-JoinRoomResult", function (result) {
  //   //   console.log(result);
  //   //   // if (result.success) {
  //   //   //   console.log("Join room !", roomId);
  //   //   // } else {
  //   //   //   console.log("Failed to join room!");
  //   //   // }
  //   // });
  // };

  return (
    <div className="">
      <div>
        Room id:
        <input
          type="text"
          className=" border-2"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <div>
        UserName:
        <input
          type="text"
          className=" border-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {/* <button onClick={handleJoinRooom}>Join</button> */}
      {/* <button onClick={sendMessage}>Send</button> */}
    </div>
  );
};

export default JoinGame;
