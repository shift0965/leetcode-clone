import { HOST_CREATE_ROOM, GET_ALL_PROBLEMS } from "../api.const";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Problem } from "../types.const";

const GameHost = () => {
  const [roomId, setRoomId] = useState<string>();
  const [problemOptions, setProblemOptions] = useState<Problem[]>([]);
  const [gameProblems, setGameProblems] = useState<number[]>([]);

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
        timeLimit: 60,
        problemList: gameProblems,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="  min-h-screen">
      <Navbar />
      <div className=" w-11/12  md:w-9/12 mx-auto mt-8 text-black">
        <div>
          <h1 className="text-xl">Questions</h1>
          <div className="">
            {gameProblems.map((gameProblem, index) => (
              <div className="flex mt-2" key={index}>
                <div className="mr-2">{index}</div>
                <select
                  name=""
                  id=""
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
              className="py-1 px-4 rounded-lg bg-dark-gray-8 mt-3"
              onClick={handleAddProblem}
            >
              Add
            </button>
          </div>
          <div className=" mt-5">
            <button
              onClick={handleCreateRoom}
              className=" bg-gray-200 px-5 py-2 rounded-lg"
            >
              Join room
            </button>
          </div>
          <div className="">RoomId: {roomId}</div>
        </div>
      </div>
    </div>
  );
};

export default GameHost;
