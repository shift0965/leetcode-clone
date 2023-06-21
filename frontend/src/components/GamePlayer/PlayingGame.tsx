const JoinGame = () => {
  const [userName, setUserName] = useState<string>();
  const [roomId, setRoomId] = useState<string>();

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
