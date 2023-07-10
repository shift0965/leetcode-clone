import { useEffect, useState } from "react";
import { GET_GAME_RESULT } from "../../api.const";
import PlayerAvatar from "./PlayerAvatar";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import Confetti from "react-confetti";
import { motion as m } from "framer-motion";
import { useRecoilState } from "recoil";
import { loadingState } from "../../atoms/stateAtoms";

interface GameResultProps {
  gameId: number;
}

interface PlayerResult {
  id: number;
  name: string;
  timeUsed: number;
  progress: boolean[];
}

interface ProblemResult {
  id: number;
  title: string;
}

const GameResult = ({ gameId }: GameResultProps) => {
  const [players, setPlayers] = useState<PlayerResult[]>([]);
  const [problems, setProblems] = useState<ProblemResult[]>([]);
  const [loading, setLoading] = useRecoilState(loadingState);
  useEffect(() => {
    setLoading(true);
    fetch(GET_GAME_RESULT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        gameId: gameId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data.players);
        setProblems(data.problems);
        setLoading(false);
      });
  }, []);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className=" w-[700px] mx-auto">
      {!loading && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center relative h-[400px] w-[600px] mx-auto ">
            <Confetti numberOfPieces={70} width={600} height={400} />
            {players[0] && (
              <div className=" absolute top-[75px]">
                <PlayerAvatar name={players[0].name} place={1} />
              </div>
            )}
            {players[1] && (
              <div className=" absolute top-[126px] left-[124px]">
                <PlayerAvatar name={players[1].name} place={2} />
              </div>
            )}
            {players[2] && (
              <div className=" absolute top-[149px] left-[380px]">
                <PlayerAvatar name={players[2].name} place={3} />
              </div>
            )}
            <img
              src="podium.png"
              alt=""
              className=" h-[200px] mt-auto"
              color="orange"
            />
          </div>
          <div>
            <table className="w-full mx-auto mt-8">
              <thead className=" text-gray-300 border-b text-left">
                <tr>
                  <th className="px-3 py-3 w-[10%] font-semibold">Place</th>
                  <th className="px-3 py-3 w-[20%] font-semibold">Name</th>

                  {problems.map((problem, id) => (
                    <th
                      className={`px-3 py-3 w-[20%] font-semibold text-sm`}
                      key={id}
                    >
                      {id + 1}-{problem.title}
                    </th>
                  ))}
                  <th className="px-3 py-3 w-[15%] font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="text-white">
                {players.map((player, place) => (
                  <tr
                    className={`${place % 2 === 1 ? "bg-dark-layer-1" : ""}`}
                    key={place}
                  >
                    <td className="pl-8 py-4 text-dark-yellow font-bold">
                      {place + 1}
                    </td>
                    <td className="pl-3 py-4 font-bold">{player.name}</td>
                    {player.progress.map((progress, id) => (
                      <td className="pl-3 py-4 text-center" key={id}>
                        {progress ? (
                          <span className="text-dark-green-s">
                            <BsCheckCircle />
                          </span>
                        ) : (
                          <div className="text-dark-pink w-fit">
                            <BsXCircle />
                          </div>
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-4 text-dark-gray-7">
                      {player.timeUsed ? formatTime(player.timeUsed) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </m.div>
      )}
    </div>
  );
};

export default GameResult;
