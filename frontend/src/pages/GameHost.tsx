import Navbar from "../components/Navbar";
import { useState } from "react";
import GameCreating from "../components/GameHost/GameCreating";
import UserJoining from "../components/GameHost/PlayersJoining";
import { GameHostState } from "../types.const";
import GameWatching from "../components/GameHost/GameWatching";

const GameHost = () => {
  const [roomId, setRoomId] = useState<number>();
  const [currentState, setCurrentState] =
    useState<GameHostState>("GameCreating");

  return (
    <div className=" ">
      <Navbar />
      {currentState === "GameCreating" && (
        <GameCreating setRoomId={setRoomId} setCurrentState={setCurrentState} />
      )}
      {currentState === "PlayersJoining" && <UserJoining roomId={roomId} />}
      {currentState === "GameWatching" && <GameWatching />}
    </div>
  );
};

export default GameHost;
