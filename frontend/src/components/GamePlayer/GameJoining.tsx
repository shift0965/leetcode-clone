import { playerApi } from "../../api";
import { useState, useEffect } from "react";
import { GamePlayerState, hasWhiteSpace } from "../../types.const";
import { toast } from "react-toastify";
import { Player } from "../../types.const";
import { motion as m } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { bulletSwitchState } from "../../atoms/stateAtoms";

interface GameJoiningProps {
  setCurrentState: React.Dispatch<React.SetStateAction<GamePlayerState>>;
  setPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>;
}

const GameJoining = ({ setCurrentState, setPlayer }: GameJoiningProps) => {
  const [playerName, setPlayerName] = useState<string>("");
  const [gameId, setGameId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const setBulletSwitch = useSetRecoilState(bulletSwitchState);

  useEffect(() => {
    setBulletSwitch(true);
  }, [setBulletSwitch]);

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (playerName === "") return toast.error("Name can not be empty");
    if (hasWhiteSpace(playerName))
      return toast.error("Name can not have whitespace");
    if (playerName.length > 20)
      return toast.error("Name can not exceed 20 characters");
    if (!Number(gameId) || Number(gameId) > 100000 || Number(gameId) < 0)
      return toast.error("Invalid game id");
    setLoading(true);

    playerApi.joinGame({
      gameId: Number(gameId),
      playerName: playerName,
    })
      .then((result) => {
        const playerData: Player = {
          id: result.playerId,
          gameId: Number(gameId),
          name: playerName,
        };
        setPlayer(playerData);
        localStorage.setItem("playerData", JSON.stringify(playerData));
        if (result.gameState === "created") setCurrentState("GameWaiting");
        else if (result.gameState === "started") {
          toast("🔥 Game is started !");
          setCurrentState("GamePlaying");
        } else {
          toast.error("Game is ended");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.errors || "Join game failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <m.div
      className="flex flex-col items-center justify-center mx-auto py-10 text-dark-gray-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl text-center">Join Game</h1>
      <form
        onSubmit={handleJoinRoom}
        className="flex flex-col items-center justify-center "
        autoComplete="off"
      >
        <div className="mt-8">
          <div className="text-lg">Game Id</div>
          <input
            type="text"
            name="game-id"
            className="bg-dark-fill-2 py-1.5 px-2 rounded-lg outline-none mt-1 w-52 text-lg"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <div className="text-lg">Name </div>
          <input
            type="text"
            name="name"
            className="bg-dark-fill-2 py-1.5 px-2 rounded-lg outline-none mt-1 w-52 text-lg"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        <button
          id="join-game-btn"
          disabled={loading}
          className="mt-8 bg-dark-green-s hover:bg-opacity-60 transition-all px-5 py-2 rounded-lg text-white font-semibold"
        >
          Join Game
        </button>
      </form>
    </m.div>
  );
};

export default GameJoining;
