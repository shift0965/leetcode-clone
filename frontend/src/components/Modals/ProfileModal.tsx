import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { profileModalState } from "../../atoms/stateAtoms";
import { hostApi, PLAYER_AVATAR_URL } from "../../api";
import { contestHistory } from "../../types.const";
import { useNavigate } from "react-router-dom";

const ProfileModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(profileModalState);
  const [hostHistory, setHostHistory] = useState<contestHistory[]>();
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickProblem = (id: number) => {
    setIsOpen(false);
    navigate(`/problem?id=${id}`);
  };

  const handleClear = async () => {
    try {
      await hostApi.clearHistory();
      setHostHistory([]);
      toast.success("History cleared successfully");
    } catch (error) {
      console.error("Error clearing history:", error);
      toast.error("Failed to clear history");
    }
  };

  const loadHostHistory = async () => {
    try {
      const result = await hostApi.getHistory();
      setHostHistory(result);
    } catch (error) {
      console.error("Failed to load host history:", error);
      toast.error("Failed to load history");
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadHostHistory();
    }
  }, [isOpen]);

  return (
    <div>
      <div
        className={`z-40 absolute top-0 w-full h-full flex items-center justify-center bg-black transition-all duration-500 ${
          isOpen ? " opacity-50 " : "pointer-events-none opacity-0"
        }`}
        onClick={closeModal}
      ></div>
      <div
        className={`w-fit absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] flex justify-center z-50 rounded-lg overflow-hidden
        transition-all duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } `}
      >
        <button className="absolute bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center text-white right-[5px] top-[5px]">
          <IoClose className="h-6 w-6" onClick={closeModal} />
        </button>

        <div className="w-[800px] max-w-[90vw] h-[560px] max-h-[90vh] bg-dark-layer-1 px-4 sm:px-10">
          <div className="h-[100px] mt-[20px] px-1 sm:px-3 text-white font-semibold text-xl sm:text-2xl flex items-center tracking-wide">
            <span className="text-dark-yellow mr-[10px]">Guest</span>
            <span className="hidden sm:inline">Host History</span>
            <span className="sm:hidden">History</span>
            <button
              onClick={handleClear}
              className="ml-auto mr-1 sm:mr-3 py-1 px-2 sm:px-3 cursor-pointer rounded bg-dark-fill-3 hover:bg-dark-fill-2 transition-all font-medium text-sm sm:text-base text-dark-pink"
            >
              Clear
            </button>
          </div>
          <div className="h-[420px] overflow-y-auto overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="text-dark-gray-8 text-left border-b-[1px] h-[60px]">
                <tr>
                  <th className="py-3 px-1 sm:px-2 w-[10%] text-sm sm:text-base">GameId</th>
                  <th className="py-3 px-1 sm:px-2 w-[25%] text-sm sm:text-base">Problems</th>
                  <th className="py-3 px-1 sm:px-2 w-[30%] text-sm sm:text-base">Players</th>
                  <th className="py-3 px-1 sm:px-2 w-[15%] text-center text-sm sm:text-base">Time</th>
                </tr>
              </thead>
              <tbody className="text-dark-gray-8 ">
                {hostHistory &&
                  hostHistory.length > 0 &&
                  hostHistory.map((contest, id) => (
                    <tr
                      className={`${id % 2 === 1 ? "bg-dark-fill-3" : ""}`}
                      key={id}
                    >
                      <td className="py-3 px-1 sm:px-3 text-sm sm:text-base">{contest.contestId}</td>
                      <td className="py-3 px-1 sm:px-2">
                        {contest.problems.map((problem, id) => (
                          <div
                            className="font-semibold leading-5 sm:leading-7 hover:text-blue-500 transition-all cursor-pointer text-sm sm:text-base"
                            onClick={() => handleClickProblem(problem.id)}
                            key={id}
                          >
                            {problem.title}
                          </div>
                        ))}
                      </td>
                      <td className="py-4 px-1 sm:px-2 flex flex-wrap">
                        {contest.players.map((player, id) => (
                          <div
                            key={id}
                            className="mr-[8px] sm:mr-[12px] mb-1 flex items-center text-sm sm:text-base"
                          >
                            <img
                              src={`${PLAYER_AVATAR_URL}&seed=${player.name}`}
                              className="h-[20px] sm:h-[25px] mr-[2px] sm:mr-[4px]"
                            ></img>
                            <span className="truncate max-w-[80px] sm:max-w-none">{player.name}</span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-1 sm:px-2 text-center text-dark-gray-7 text-sm sm:text-base">
                        <div>
                          {new Date(contest.startedAt).toLocaleDateString()}
                        </div>
                        <div>
                          {new Date(contest.startedAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {hostHistory && hostHistory.length === 0 && (
              <div className="h-[300px] w-full items-center justify-center flex text-xl tracking-wide text-dark-gray-7">
                You have no host history
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;