import Navbar from "../components/NavBars/Navbar";
import { useState, useEffect } from "react";
import GameCreating from "../components/GameHost/GameCreating";
import PlayerJoining from "../components/GameHost/PlayersJoining";
import { GameHostState } from "../types.const";
import GameWatching from "../components/GameHost/GameWatching";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HOST_CHECK_GAME } from "../api.const";
import HostNavbar from "../components/GameHost/HostNavbar";
import GameResult from "../components/GameResult/GameResult";

const GameHost = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState<number>();
  const [currentState, setCurrentState] = useState<GameHostState>("Loading");

  useEffect(() => {
    const userDataJSON = localStorage.getItem("userData");
    if (!userDataJSON) {
      navigate("/");
      toast.error("Sign In Time Out");
    } else {
      const userToken = JSON.parse(userDataJSON).access_token;

      fetch(HOST_CHECK_GAME, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.founded) {
            setGameId(result.contestId);
            setCurrentState(() => {
              if (result.state === "created") return "PlayersJoining";
              else if (result.state === "started") return "GameWatching";
              else if (result.state === "closed") return "GameResult";
              return "GameCreating";
            });
          } else {
            setCurrentState("GameCreating");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <>
      {currentState === "GameCreating" || currentState === "Loading" ? (
        <Navbar />
      ) : (
        <HostNavbar
          gameId={gameId}
          currentState={currentState}
          setCurrentState={setCurrentState}
        />
      )}
      <div className="h-[calc(100vh-48px)] overflow-y-auto">
        {currentState === "GameCreating" && (
          <GameCreating
            setGameId={setGameId}
            setCurrentState={setCurrentState}
          />
        )}
        {currentState === "PlayersJoining" && gameId && (
          <PlayerJoining gameId={gameId} />
        )}
        {currentState === "GameWatching" && gameId && (
          <GameWatching gameId={gameId} />
        )}
        {currentState === "GameResult" && gameId && (
          <GameResult gameId={gameId} />
        )}
      </div>
    </>
  );
};

export default GameHost;
