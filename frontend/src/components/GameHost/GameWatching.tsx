import { useEffect, useState } from "react";
import { PlayerProgress, ProblemDetails, PlayerCode } from "../../types.const";
import { BsChevronUp } from "react-icons/bs";
import { io } from "socket.io-client";
import CodeMirror from "../Workspace/CodeMirror";
import {
  GET_CONTEST_PROBLEMS,
  GET_PLAYER_PROGRESS,
  HOST_GET_PLAYERS_CODE,
  PLAYER_AVATAR_URL,
  WEB_SOCKET_URL,
} from "../../api.const";
import FocusedPlayer from "./FocusedPlayer";
import { motion as m } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { authModalState, loadingState } from "../../atoms/stateAtoms";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface GameWatchingProps {
  gameId: number;
}

const GameWatching = ({ gameId }: GameWatchingProps) => {
  const [playersProgress, setPlayersProgress] = useState<PlayerProgress[]>([]);
  const [problems, setProblems] = useState<ProblemDetails[]>([]);
  const [playersCode, setPlayersCode] = useState<PlayerCode[]>([]);
  const [openPlayersBar, setOpenPlayersBar] = useState<boolean>(true);
  const [socket] = useState(() => {
    return io(WEB_SOCKET_URL);
  });
  const [focusedPlayerId, setFocusedPlayerId] = useState<number | undefined>(
    undefined
  );
  const setLoading = useSetRecoilState(loadingState);

  const setAuthModal = useSetRecoilState(authModalState);
  const navigate = useNavigate();

  const sortProgress = () => {
    setPlayersProgress((prev) => {
      prev.sort((a, b) => {
        const scoreA = a.progress.reduce(
          (acc, cur) => (cur.passed ? acc + 1 : acc),
          0
        );
        const scoreB = b.progress.reduce(
          (acc, cur) => (cur.passed ? acc + 1 : acc),
          0
        );
        if (scoreA > scoreB) {
          return -1;
        } else if (scoreA < scoreB) {
          return 1;
        } else {
          if (a.finishedAt && b.finishedAt) {
            return (
              new Date(a.finishedAt).getTime() -
              new Date(b.finishedAt).getTime()
            );
          }
        }
        return 0;
      });
      return [...prev];
    });
  };

  useEffect(() => {
    fetch(GET_CONTEST_PROBLEMS, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        gameId: gameId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProblems(data.problems);
      });

    socket.emit("ws-host-joinGame", { gameId: gameId });
  }, [socket]);

  useEffect(() => {
    if (problems.length > 0) {
      setLoading(true);
      fetch(GET_PLAYER_PROGRESS, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          gameId: gameId,
        }),
      })
        .then((response) => response.json())
        .then((results) => {
          setPlayersProgress(
            results.progress.map(
              (data: {
                id: number;
                name: string;
                progress: string;
                finishedAt: Date | null;
              }) => ({
                id: data.id,
                name: data.name,
                finishedAt: data.finishedAt,
                progress: data.progress
                  ? JSON.parse(data.progress)
                  : problems.map((p) => ({ id: p.id, passed: false })),
              })
            )
          );
          sortProgress();
        })
        .finally(() => {
          setLoading(false);
        });

      const userData = localStorage.getItem("userData");
      if (!userData) {
        setAuthModal((prev) => ({ ...prev, isLogin: false }));
        navigate("/");
        toast.error("Login Timeout");
        return;
      }
      const userToken = JSON.parse(userData).access_token;

      setLoading(true);
      fetch(HOST_GET_PLAYERS_CODE, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then(async (response) => {
          if (response.status === 401 || response.status === 403) {
            toast.error("Login timeout");
            localStorage.removeItem("userData");
            setAuthModal((prev) => ({ ...prev, isLogin: false }));
            navigate("/");
            return response.json().then((error) => {
              throw error;
            });
          }
          return response.json();
        })
        .then((results) => {
          setPlayersCode(
            results.playersCode.map((player: PlayerCode) => ({
              id: player.id,
              name: player.name,
              problems: problems.map((problem) => {
                const problemIndex = player.problems.findIndex(
                  (p) => p.id === problem.id
                );
                if (problemIndex === -1) {
                  return {
                    id: problem.id,
                    title: problem.title,
                    code: problem.boilerplate.replace(/\n\s+/g, "\n"),
                  };
                } else {
                  return {
                    ...player.problems[problemIndex],
                  };
                }
              }),
            }))
          );
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });

      socket.on(
        "ws-host-updateProgress",
        function ({
          playerId,
          progress,
          finishedAt,
        }: {
          playerId: number;
          progress: { id: number; passed: boolean }[];
          finishedAt: Date | null;
        }) {
          setPlayersProgress((prev) => {
            prev.forEach((player) => {
              if (player.id === playerId) {
                player.progress = progress;
                player.finishedAt = finishedAt;
              }
            });
            return [...prev];
          });
          sortProgress();
        }
      );

      socket.on(
        "ws-host-playerExitGame",
        function (exitedPlayer: { id: number }) {
          setPlayersProgress((prev) =>
            prev.filter((player) => player.id != exitedPlayer.id)
          );
          setPlayersCode((prev) =>
            prev.filter((player) => player.id != exitedPlayer.id)
          );
        }
      );

      socket.on(
        "ws-host-playerJoinGame",
        function (newPlayer: { id: number; name: string }) {
          setPlayersProgress((prev) => [
            ...prev,
            {
              id: newPlayer.id,
              name: newPlayer.name,
              finishedAt: null,
              progress: problems.map((p) => ({ id: p.id, passed: false })),
            },
          ]);
          setPlayersCode((prev) => {
            prev.push({
              id: newPlayer.id,
              name: newPlayer.name,
              problems: problems.map((problem) => ({
                id: problem.id,
                title: problem.title,
                code: problem.boilerplate.replace(/\n\s+/g, "\n"),
              })),
            });
            return [...prev];
          });
        }
      );

      socket.on(
        "ws-host-playerUpdateCode",
        function (data: {
          id: number;
          name: string;
          problemId: number;
          problemTitle: string;
          code: string;
        }) {
          setPlayersCode((prev) => {
            const playerIndex = prev.findIndex((p) => p.id === data.id);
            if (playerIndex !== -1) {
              const problemIndex = prev[playerIndex].problems.findIndex(
                (p) => p.id === data.problemId
              );
              if (problemIndex !== -1) {
                prev[playerIndex].problems[problemIndex].code = data.code;
                prev[playerIndex].lastModifyedProblem = problemIndex;
              }
            }
            return [...prev];
          });
        }
      );
    }
    return () => {
      socket.off("ws-host-updateProgress");
      socket.off("ws-host-playerJoinGame");
      socket.off("ws-host-playerExitGame");
      socket.off("ws-host-playerUpdateCode");
    };
  }, [problems, socket]);

  return (
    <>
      <m.div
        className="flex relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`transform transition-all duration-500 ease-in-out flex items-center justify-center h-20 w-5
             absolute rounded-r-lg  bg-slate-700 hover:bg-slate-500 bg-opacity-80 cursor-pointer z-10 top-[50%] -translate-y-1/2
             left-[0px] ${
               openPlayersBar ? "-translate-x-[50px]" : "translate-x-0"
             }`}
          onClick={() => setOpenPlayersBar(true)}
        >
          <BsChevronUp className="text-white rotate-90" />
        </div>
        <div
          className={`text-dark-gray-8 shrink-0 bg-dark-layer-1 mt-[8px] h-[calc(100vh-64px)] rounded-lg transition-all duration-450
        ${
          openPlayersBar
            ? "translate-x-0 w-[300px] ml-[8px]"
            : "-translate-x-[100px] w-[0px]"
        }`}
        >
          <div className="h-[64px] flex items-center border-b-[1px] border-dark-fill-2 px-3 relative">
            <h1 className="text-xl">
              Game Id - <strong className=" text-dark-pink">{gameId}</strong>
            </h1>
            <div
              className="ml-1 transform transition-all duration-500 ease-in-out flex items-center justify-center h-9 w-9
             absolute rounded-lg bg-dark-fill-3 hover:bg-dark-fill-2 cursor-pointer z-10 top-[14px]
             right-[8px]"
              onClick={() => setOpenPlayersBar(false)}
            >
              <BsChevronUp className="text-white -rotate-90" />
            </div>
          </div>
          <div className="h-[calc(100vh-128px)] overflow-y-auto overflow-hidden rounded-b-lg">
            {playersProgress.map((player, id) => {
              const total = player.progress.length;
              const score = player.progress.reduce(
                (acc, cur) => (cur.passed ? acc + 1 : acc),
                0
              );
              return (
                <div
                  className={`h-[72px] border-b-[1px] border-dark-fill-2 flex items-center  px-3 cursor-pointer 
                          hover:bg-dark-fill-3 ${
                            focusedPlayerId === player.id
                              ? "bg-dark-fill-3"
                              : "bg-dark-layer-1"
                          }`}
                  key={id}
                  onClick={() => {
                    if (focusedPlayerId === player.id) {
                      setFocusedPlayerId(undefined);
                    } else {
                      setFocusedPlayerId(player.id);
                    }
                  }}
                >
                  <div className="text-xl font-semibold text-dark-yellow">
                    {id + 1}
                  </div>
                  <div className="h-11 w-11 shrink-0 bg-dark-fill-2 rounded-full flex justify-center items-center overflow-hidden ml-3">
                    <img
                      src={`${PLAYER_AVATAR_URL}&seed=${player.name}`}
                      alt="avatar"
                      className="h-11"
                    />
                  </div>
                  <div className="text-lg ml-3 truncate">{player.name}</div>
                  <div className=" ml-auto text-lg">
                    {score}/{total}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {!focusedPlayerId && (
          <div className="shrink text-gray-50 mt-[8px] h-[calc(100vh-64px)] w-full overflow-y-auto">
            <div
              className="flex flex-wrap gap-[12px] px-[14px]"
              id="players code"
            >
              {playersCode.map((playerCode, id) => {
                const problem =
                  playerCode.problems[playerCode.lastModifyedProblem || 0];
                return (
                  <div
                    className="h-[300px] w-[calc(50%-10px)] relative rounded-lg bg-dark-layer-1 overflow-hidden cursor-pointer"
                    key={`player ${id}`}
                    onClick={() => setFocusedPlayerId(playerCode.id)}
                  >
                    <div className=" absolute bottom-0">
                      <CodeMirror userCode={problem.code} readOnly={true} />
                    </div>
                    <div className="absolute top-2 left-3 flex bg-sky-900 items-center rounded-lg px-2 py-1">
                      <img
                        src={`${PLAYER_AVATAR_URL}&seed=${playerCode.name}`}
                        alt="avatar"
                        className=" h-[26px] mr-1"
                      />
                      <div className="truncate max-w-[160px]">
                        {playerCode.name}
                      </div>
                    </div>
                    <div className=" absolute top-2 right-3 truncate max-w-[200px] bg-emerald-900 items-center rounded-lg px-2 py-1">
                      {problem.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {focusedPlayerId && (
          <FocusedPlayer
            gameId={gameId}
            playersCode={playersCode}
            focusedPlayerId={focusedPlayerId}
            playersProgress={playersProgress}
            setFocusedPlayerId={setFocusedPlayerId}
          />
        )}
      </m.div>
    </>
  );
};

export default GameWatching;
