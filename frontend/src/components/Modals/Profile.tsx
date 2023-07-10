import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { authModalState } from "../../atoms/stateAtoms";
import { useSetRecoilState } from "recoil";
import { HOST_GET_HISTORY } from "../../api.const";
import { contestHistory } from "../../types.const";
import { useNavigate } from "react-router-dom";
import { PLAYER_AVATAR_URL } from "../../api.const";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const setAuthModal = useSetRecoilState(authModalState);
  const [hostHistory, setHostHistory] = useState<contestHistory[]>();

  const navigate = useNavigate();
  const handleClickProblem = (id: number) => {
    setAuthModal((prev) => ({ ...prev, isOpen: false }));
    navigate(`/problem?id=${id}`);
  };

  useEffect(() => {
    const userDataJson = localStorage.getItem("userData");
    if (userDataJson) {
      const userData = JSON.parse(userDataJson);
      setUserName(userData.user.name);
      const userToken = userData.access_token;

      fetch(HOST_GET_HISTORY, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setHostHistory(result);
        });
    } else {
      toast.error("Login timeout");
      setAuthModal((prev) => ({ ...prev, isOpen: false, isLogin: false }));
    }
  }, []);

  return (
    <div className=" w-[800px] h-[560px] bg-dark-layer-1 px-10">
      <div className=" h-[100px] mt-[20px] px-3 text-white font-semibold text-2xl flex items-center tracking-wide">
        <span className=" text-dark-yellow mr-[10px]">{userName}'s</span>Host
        History
      </div>
      <div className="h-[420px] overflow-y-auto">
        <table className="w-full">
          <thead className="text-dark-gray-8 text-left border-b-[1px] h-[60px]">
            <tr>
              <th className="py-3 px-2 w-[10%]">GameId</th>
              <th className="py-3 px-2 w-[25%]">Problems</th>
              <th className="py-3 px-2 w-[30%]">Players</th>
              <th className="py-3 px-2 w-[15%] text-center">Time</th>
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
                  <td className="py-3 px-3">{contest.contestId}</td>
                  <td className="py-3 px-2">
                    {contest.problems.map((problem, id) => (
                      <div
                        className="font-semibold leading-7 hover:text-blue-500 transition-all cursor-pointer"
                        onClick={() => handleClickProblem(problem.id)}
                        key={id}
                      >
                        {problem.title}
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-2 flex flex-wrap">
                    {contest.players.map((player, id) => (
                      <div
                        key={id}
                        className="mr-[12px] mb-1 flex items-center"
                      >
                        <img
                          src={`${PLAYER_AVATAR_URL}&seed=${player.name}`}
                          className="h-[25px] mr-[4px]"
                        ></img>
                        {player.name}
                      </div>
                    ))}
                  </td>
                  <td className="py-3 text-center text-dark-gray-7">
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
  );
};

export default Profile;
