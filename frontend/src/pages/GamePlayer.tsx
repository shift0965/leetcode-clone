import { useEffect, useState } from "react";
import Navbar from "../components/NavBars/Navbar";
import { GamePlayerState, Player } from "../types.const";
import GameJoining from "../components/GamePlayer/GameJoining";
import GameWaiting from "../components/GamePlayer/GameWaiting";
import { PLAYER_CHECK_GAME } from "../api.const";
import PlayerNavbar from "../components/GamePlayer/PlayerNavbar";

const GamePlayer = () => {
  const [currentState, setCurrentState] = useState<GamePlayerState>("Loading");
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    const playerDataJSON = localStorage.getItem("playerData");
    if (!playerDataJSON) {
      console.log("No player data");
      setCurrentState("GameJoining");
    } else {
      const playerData: Player = JSON.parse(playerDataJSON);
      console.log(playerData);
      fetch(PLAYER_CHECK_GAME, {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          playerId: playerData.id,
          contestId: playerData.gameId,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          setPlayer(playerData);
          if (result.founded) {
            if (result.state === "created")
              return setCurrentState("GameWaiting");
          } else {
            //if the game is ended
            localStorage.removeItem("playerData");
            setCurrentState("GameJoining");
          }
        });
    }
  }, []);

  return (
    <div className="text-dark-gray-8">
      {currentState === "GameJoining" ? (
        <Navbar />
      ) : (
        <PlayerNavbar player={player} />
      )}
      {currentState === "GameJoining" && (
        <GameJoining setCurrentState={setCurrentState} setPlayer={setPlayer} />
      )}
      {currentState === "GameWaiting" && <GameWaiting player={player} />}
    </div>
  );
};

export default GamePlayer;
