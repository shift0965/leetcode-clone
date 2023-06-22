import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { GamePlayerState } from "../types.const";
import GameJoining from "../components/GamePlayer/GameJoining";
import GameWaiting from "../components/GamePlayer/GameWaiting";

const GamePlayer = () => {
  const [currentState, setCurrentState] =
    useState<GamePlayerState>("GameJoining");

  return (
    <div className="text-dark-gray-8">
      <Navbar />
      {currentState === "GameJoining" && (
        <GameJoining setCurrentState={setCurrentState} />
      )}
      {currentState === "GameWaiting" && <GameWaiting />}
    </div>
  );
};

export default GamePlayer;
