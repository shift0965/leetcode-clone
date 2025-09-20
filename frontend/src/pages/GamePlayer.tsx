import { useEffect, useState } from "react";
import Navbar from "../components/NavBars/Navbar";
import { GamePlayerState, Player } from "../types.const";
import GameJoining from "../components/GamePlayer/GameJoining";
import GameWaiting from "../components/GamePlayer/GameWaiting";
import { playerApi } from "../api";
import PlayerNavbar from "../components/GamePlayer/PlayerNavbar";
import GamePlaying from "../components/GamePlayer/GamePlaying";
import GameResult from "../components/GameResult/GameResult";

const GamePlayer = () => {
  const [currentState, setCurrentState] = useState<GamePlayerState>("Loading");
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    const playerDataJSON = localStorage.getItem("playerData");
    if (!playerDataJSON) {
      setCurrentState("GameJoining");
    } else {
      const playerData: Player = JSON.parse(playerDataJSON);
      playerApi.checkGame({
        playerId: playerData.id,
        gameId: playerData.gameId,
      })
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
    <>
      {currentState === "GameJoining" || currentState === "Loading" ? (
        <Navbar />
      ) : (
        <PlayerNavbar
          player={player}
          currentState={currentState}
          setCurrentState={setCurrentState}
        />
      )}

      <div className="h-[calc(100vh-48px)] overflow-y-auto">
        {currentState === "GameJoining" && (
          <GameJoining
            setCurrentState={setCurrentState}
            setPlayer={setPlayer}
          />
        )}
        {currentState === "GameWaiting" && player && (
          <GameWaiting
            setCurrentState={setCurrentState}
            player={player}
            gameId={player.gameId}
          />
        )}
        {currentState === "GamePlaying" && player && (
          <GamePlaying setCurrentState={setCurrentState} player={player} />
        )}
        {currentState === "GameResult" && player && (
          <GameResult gameId={player.gameId} />
        )}
      </div>
    </>
  );
};

export default GamePlayer;
