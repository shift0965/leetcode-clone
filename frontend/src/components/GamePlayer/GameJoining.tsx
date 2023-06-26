import { PLAYER_JOIN_GAME } from "../../api.const";
import { useState } from "react";
import { GamePlayerState } from "../../types.const";
import { toast } from "react-toastify";
import { Player } from "../../types.const";

interface GameJoiningProps {
  setCurrentState: React.Dispatch<React.SetStateAction<GamePlayerState>>;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
}

const GameJoining = ({ setCurrentState, setPlayer }: GameJoiningProps) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");

  const handleJoinRoom = () => {
    fetch(PLAYER_JOIN_GAME, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        gameId: gameId,
        playerName: playerName,
      }),
    })
      .then((response) => {
        if (response.status !== 200)
          return response.json().then((error) => {
            throw error;
          });
        else {
          return response.json();
        }
      })
      .then((result) => {
        const playerData: Player = {
          id: result.playerId,
          gameId: Number(gameId),
          name: playerName,
        };
        setPlayer(playerData);
        localStorage.setItem("playerData", JSON.stringify(playerData));
        setCurrentState("GameWaiting");
      })
      .catch((error) => {
        toast.error(error.errors);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto mt-10 text-dark-gray-8">
      <h1 className="text-2xl text-center">Join Game</h1>
      <div className="mt-8">
        <div className="text-lg">Game Id</div>
        <input
          type="text"
          className="bg-dark-fill-2 py-1.5 px-2 rounded-lg outline-none mt-1 w-52 text-lg"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <div className="text-lg">Name </div>
        <input
          type="text"
          className="bg-dark-fill-2 py-1.5 px-2 rounded-lg outline-none mt-1 w-52 text-lg"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <button
        onClick={handleJoinRoom}
        className="mt-8 bg-dark-green-s hover:bg-opacity-60 transition-all px-5 py-2 rounded-lg text-white font-semibold"
      >
        Join Game
      </button>
    </div>
  );
};

export default GameJoining;
