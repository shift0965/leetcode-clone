import { Problem } from "../../types.const";
import { useEffect, useState } from "react";
import { HOST_CREATE_GAME, GET_ALL_PROBLEMS } from "../../api.const";
import { GameHostState } from "../../types.const";
import { toast } from "react-toastify";
import { CiCircleRemove } from "react-icons/ci";
import { motion as m } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState, loadingState } from "../../atoms/stateAtoms";
import { useNavigate } from "react-router-dom";

interface GameCreatingProps {
  setCurrentState: React.Dispatch<React.SetStateAction<GameHostState>>;
  setGameId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const GameCreating = ({ setGameId, setCurrentState }: GameCreatingProps) => {
  const setAuthModal = useSetRecoilState(authModalState);
  const [allProblems, setAllProblems] = useState<Problem[]>([]);
  const [selectedProblemIds, setSelectedProblemIds] = useState<number[]>([]);
  const [timeLimit, setTimeLimit] = useState<number>(60);
  const [loading, setLoading] = useRecoilState(loadingState);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(GET_ALL_PROBLEMS, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((results) => {
        setAllProblems(results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddProblem = () => {
    if (selectedProblemIds.length >= 5) {
      toast.error("At most 5 questions!");
    } else {
      setSelectedProblemIds((prev) => [...prev, 0]);
    }
  };

  const handleSelect = (problemId: number, id: number) => {
    setSelectedProblemIds((prev) => {
      const copy = [...prev];
      copy[id] = problemId;
      return copy;
    });
  };

  const handleRemoveProblem = (problemId: number) => {
    setSelectedProblemIds((prev) => {
      const copy = [...prev];
      copy.splice(problemId, 1);
      return copy;
    });
  };

  const handleCreateRoom = () => {
    if (selectedProblemIds.length === 0)
      return toast.error("No question is selected");

    if (new Set(selectedProblemIds).size !== selectedProblemIds.length) {
      return toast.error("Questions should not repeat");
    }
    if (timeLimit > 300) {
      return toast.error("Time limit should not exceed 300 mins");
    }
    if (timeLimit < 3) {
      return toast.error("Time limit should be more than 3 mins");
    }

    const userData = localStorage.getItem("userData");
    if (!userData) {
      setAuthModal((prev) => ({ ...prev, isLogin: false }));
      return toast.error("Please Log In");
    }
    const userToken = JSON.parse(userData).access_token;

    fetch(`${HOST_CREATE_GAME}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        timeLimit: timeLimit,
        problemList: selectedProblemIds.map((id) => allProblems[id].id),
      }),
    }).then((response) => {
      if (response.status === 401 || response.status === 403) {
        toast.error("Login timeout");
        localStorage.removeItem("userData");
        setAuthModal((prev) => ({ ...prev, isLogin: false }));
        setCurrentState("GameCreating");
      } else if (response.status !== 200) {
        response.json().then((result) => {
          console.error(result);
          toast.error(result.errors || "Create game failed");
          navigate("/");
        });
      } else
        response.json().then((result) => {
          setGameId(result.gameId);
          setCurrentState("PlayersJoining");
        });
    });
  };

  return (
    <>
      {!loading && (
        <m.div
          className="w-11/12 md:w-9/12 mx-auto py-10 text-dark-gray-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl text-center">Create Game</h1>
          <h1 className="text-xl mt-6 ml-1">Questions</h1>
          <div className="mt-3">
            <table className="w-full mx-auto">
              <thead className=" text-gray-300 border-b text-left">
                <tr>
                  <th className="px-3 py-3 w-[10%] font-semibold">Id</th>
                  <th className="px-3 py-3 w-[35%] font-semibold">Title</th>
                  <th className="px-3 py-3 w-[30%] font-semibold">Category</th>
                  <th className="px-3 py-3 w-[15%] font-semibold">
                    Difficulty
                  </th>
                  <th className="px-3 py-3 w-[10%]"></th>
                </tr>
              </thead>
              <tbody>
                {selectedProblemIds.map((selectedProblemId, index) => {
                  const selectedProblem = allProblems[selectedProblemId];
                  const difficulyColor =
                    selectedProblem.difficulty === "Easy"
                      ? "text-dark-green-s"
                      : selectedProblem.difficulty === "Medium"
                      ? "text-dark-yellow"
                      : "text-dark-pink";
                  return (
                    <tr
                      className={`${index % 2 === 1 ? "bg-dark-layer-1" : ""}`}
                      key={index}
                    >
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="mr-2">{index + 1}</div>
                      </td>

                      <td className="px-3 py-2">
                        <select
                          className=" bg-dark-fill-2 outline-none py-1.5 px-2 rounded-lg text-dark-gray-8 font-medium"
                          onChange={(e) => {
                            handleSelect(Number(e.target.value), index);
                          }}
                        >
                          {allProblems.map((problem, problemId) => (
                            <option key={problemId} value={problemId}>
                              {problem.title}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className={"px-2"}>
                        <div className="flex">
                          {selectedProblem.tags.map((tag) => (
                            <div
                              key={tag.id}
                              className="mr-3 bg-dark-fill-2 px-2 py-[2px] rounded-lg "
                            >
                              {tag.title}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className={`px-3 py-4 ${difficulyColor}`}>
                        {selectedProblem.difficulty}
                      </td>
                      <td>
                        <button
                          id={`remove-${index}`}
                          className="mx-auto flex items-center text-3xl cursor-pointer rounded hover:text-dark-pink transition-all"
                          onClick={() => handleRemoveProblem(index)}
                        >
                          <CiCircleRemove />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-center">
              <button
                id="add-question-btn"
                className="mt-5 py-1 px-3 cursor-pointer rounded  font-medium bg-dark-gray-8 hover:bg-dark-gray-7 transition-all text-dark-layer-2"
                onClick={handleAddProblem}
              >
                Add Question
              </button>
            </div>
          </div>

          <div className=" mt-5">
            <h1 className="text-xl mt-10 ml-1">Time Limits</h1>
            <div className="mt-3 flex items-center">
              <input
                type="text"
                value={timeLimit}
                onChange={(e) =>
                  setTimeLimit(
                    Math.abs(Math.floor(Number(e.target.value))) || 0
                  )
                }
                className=" bg-dark-fill-2 px-3 py-1.5 w-16 outline-none rounded-lg"
              />
              <div className="ml-2 text-lg">Minutes</div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <button
              id="create-game-btn"
              onClick={handleCreateRoom}
              className="bg-dark-green-s hover:bg-opacity-60 transition-all px-5 py-2 rounded-lg text-white font-semibold"
            >
              Create Game
            </button>
          </div>
        </m.div>
      )}
    </>
  );
};

export default GameCreating;
