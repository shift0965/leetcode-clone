import { useEffect, useState } from "react";
import Navbar from "../components/NavBars/Navbar";
import { GamePlayerState, Player } from "../types.const";
import GameJoining from "../components/GamePlayer/GameJoining";
import GameWaiting from "../components/GamePlayer/GameWaiting";
import { PLAYER_CHECK_GAME } from "../api.const";
import PlayerNavbar from "../components/GamePlayer/PlayerNavbar";
import GamePlaying from "../components/GamePlayer/GamePlaying";
import GameResult from "../components/GameResult/GameResult";
import { useRecoilState } from "recoil";
import { loadingState } from "../atoms/stateAtoms";
import Loading from "../components/Loading";
import { motion as m } from "framer-motion";

const GamePlayer = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [currentState, setCurrentState] =
    useState<GamePlayerState>("GameJoining");
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    setLoading(true);
    const playerDataJSON = localStorage.getItem("playerData");
    if (!playerDataJSON) {
      setCurrentState("GameJoining");
      setLoading(false);
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
          setLoading(false);
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
      <Loading />
      {currentState === "GameJoining" ? (
        <Navbar />
      ) : (
        <PlayerNavbar
          player={player}
          currentState={currentState}
          setCurrentState={setCurrentState}
        />
      )}
      <m.div
        className={`text-dark-gray-8 ${loading && "opacity-0"} transition-all`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentState === "GameJoining" && (
          <GameJoining
            setCurrentState={setCurrentState}
            setPlayer={setPlayer}
          />
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
      </m.div>
    </>
  );
};

export default GamePlayer;
