import { Player_JOIN_ROOM } from "../../api.const";
import { useState } from "react";
import { GamePlayerState } from "../../types.const";

interface GameJoiningProps {
  setCurrentState: React.Dispatch<React.SetStateAction<GamePlayerState>>;
}

const GameJoining = ({ setCurrentState }: GameJoiningProps) => {
  const [userName, setUserName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleJoinRoom = () => {
    setErrorMessage(undefined);
    fetch(Player_JOIN_ROOM, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        roomId: roomId,
        userName: userName,
      }),
    })
      .then((response) => {
        if (response.status === 404)
          return response.json().then((error) => {
            throw error;
          });
        else {
          return response.json();
        }
      })
      .then((result) => {
        console.log(result);
        setCurrentState("GameWaiting");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="w-11/12 md:w-9/12 mx-auto mt-8 text-dark-gray-8">
      <div>
        <div>
          {errorMessage && (
            <div className="mb-5 text-dark-pink">{errorMessage}</div>
          )}
        </div>
        <label>RoomId: </label>
        <input
          type="text"
          className="bg-dark-fill-2"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <div className=" mt-2">
        <label>UserName: </label>
        <input
          type="text"
          className="bg-dark-fill-2"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <button
        onClick={handleJoinRoom}
        className="bg-dark-yellow px-5 py-2 rounded-lg text-white mt-5"
      >
        JoinRoom
      </button>
    </div>
  );
};

export default GameJoining;
