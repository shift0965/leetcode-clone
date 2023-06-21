import { Problem } from "../../types.const";
import { useEffect, useState } from "react";
import { HOST_CREATE_ROOM, GET_ALL_PROBLEMS } from "../../api.const";
import { GameHostState } from "../../types.const";

interface GameCreatingProps {
  setCurrentState: React.Dispatch<React.SetStateAction<GameHostState>>;
  setRoomId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const GameCreating = ({ setRoomId, setCurrentState }: GameCreatingProps) => {
  const [problemOptions, setProblemOptions] = useState<Problem[]>([]);
  const [gameProblems, setGameProblems] = useState<number[]>([]);
  const [timeLimit, setTimeLimit] = useState<number>(60);

  useEffect(() => {
    fetch(GET_ALL_PROBLEMS, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((results) => {
        setProblemOptions(results);
      });
  }, []);

  const handleAddProblem = () => {
    setGameProblems((prev) => [...prev, problemOptions[0].id]);
  };

  const handleSelect = (problemId: number, id: number) => {
    setGameProblems((prev) => {
      const copy = [...prev];
      copy[id] = problemId;
      return copy;
    });
  };

  const handleCreateRoom = () => {
    console.log(gameProblems);
    fetch(`${HOST_CREATE_ROOM}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: 100,
        timeLimit: timeLimit,
        problemList: gameProblems,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setRoomId(result.roomId);
        setCurrentState("PlayersJoining");
      });
  };

  return (
    <div>
      <h1 className="text-xl">Questions</h1>
      <div className="">
        {gameProblems.map((gameProblem, index) => (
          <div className="flex mt-2" key={index}>
            <div className="mr-2">{index}</div>
            <select
              className=" bg-dark-fill-2"
              onChange={(e) => {
                handleSelect(Number(e.target.value), index);
              }}
            >
              {problemOptions.map((problem) => (
                <option key={problem.id} value={problem.id}>
                  {problem.title}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          className="py-1 px-4 rounded-lg bg-dark-gray-8 mt-3 text-dark-layer-2"
          onClick={handleAddProblem}
        >
          Add
        </button>
      </div>

      <div className=" mt-5">
        <h1 className="text-xl">Minutes</h1>
        <div className="">
          <input
            type="text"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
            className=" bg-dark-fill-2"
          />{" "}
          mins
        </div>
      </div>
      <div className=" mt-5">
        <button
          onClick={handleCreateRoom}
          className=" bg-dark-yellow px-5 py-2 rounded-lg text-white "
        >
          Create room
        </button>
      </div>
    </div>
  );
};

export default GameCreating;
