import { useEffect, useState } from "react";
import Navbar from "../components/NavBars/Navbar";
import { GamePlayerState, Player } from "../types.const";
import GameJoining from "../components/GamePlayer/GameJoining";
import GameWaiting from "../components/GamePlayer/GameWaiting";
import { PLAYER_CHECK_GAME } from "../api.const";
import PlayerNavbar from "../components/GamePlayer/PlayerNavbar";
import GamePlaying from "../components/GamePlayer/GamePlaying";
import GameResult from "../components/GameResult/GameResult";

const GamePlayer = () => {
  const [currentState, setCurrentState] = useState<GamePlayerState>("Loading");
  const [player, setPlayer] = useState<Player>();
  const [bulletSwitch, setBulletSwitch] = useState<boolean>(true);

  useEffect(() => {
    const playerDataJSON = localStorage.getItem("playerData");
    if (!playerDataJSON) {
      setCurrentState("GameJoining");
    } else {
      const playerData: Player = JSON.parse(playerDataJSON);
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
            setCurrentState(() => {
              if (result.state === "created") return "GameWaiting";
              else if (result.state === "started") return "GamePlaying";
              else if (result.state === "closed") return "GameResult";
              else return "GameJoining";
            });
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
        <PlayerNavbar
          player={player}
          currentState={currentState}
          setCurrentState={setCurrentState}
        />
      )}
      {currentState === "GameJoining" && (
        <GameJoining setCurrentState={setCurrentState} setPlayer={setPlayer} />
      )}
      {currentState === "GameWaiting" && player && (
        <GameWaiting setCurrentState={setCurrentState} player={player} />
      )}
      {currentState === "GamePlaying" && player && (
        <GamePlaying setCurrentState={setCurrentState} player={player} />
      )}
      {currentState === "GameResult" && player && (
        <GameResult gameId={player.gameId} />
      )}
    </div>
  );
};

export default GamePlayer;
