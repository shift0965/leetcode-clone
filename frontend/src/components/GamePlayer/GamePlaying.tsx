import { useEffect, useState, useRef, useCallback } from "react";
import {
  GET_CONTEST_PROBLEMS,
  GET_PLAYER_PROGRESS,
  WEB_SOCKET_URL,
  PLAYER_AVATAR_URL,
} from "../../api.const";
import {
  GamePlayerState,
  Player,
  PlayerProgress,
  ProblemDetails,
} from "../../types.const";
import Split from "react-split";
import Playground from "../Workspace/Playground";
import { BsCheck2Circle } from "react-icons/bs";
import DescriptionArea from "../Workspace/DescriptionArea";
import { io } from "socket.io-client";
import { debounce } from "lodash";
import BulletScreen from "./BulletScreen";
import { useRecoilValue } from "recoil";
import { bulletSwitchState } from "../../atoms/stateAtoms";
import { BsChevronUp } from "react-icons/bs";
import { motion as m } from "framer-motion";
import { toast } from "react-toastify";

interface GamePlayingProps {
  player: Player;
  setCurrentState: React.Dispatch<React.SetStateAction<GamePlayerState>>;
}

const GamePlaying = ({ player, setCurrentState }: GamePlayingProps) => {
  const [problems, setProblems] = useState<ProblemDetails[]>([]);
  const [currentProblemId, setCurrentProblemId] = useState<number>(0);
  const [myProgress, setMyProgress] = useState<PlayerProgress>();
  const [playersProgress, setPlayersProgress] = useState<PlayerProgress[]>([]);
  const socket = useRef(io(WEB_SOCKET_URL)).current;
  const bulletSwitch = useRecoilValue(bulletSwitchState);
  const [openPlayersBar, setOpenPlayersBar] = useState<boolean>(true);

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
        gameId: player?.gameId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setProblems(data.problems);
      });

    socket.emit("ws-player-joinGame", { gameId: player.gameId });
    socket.on("ws-player-hostCloseGame", function () {
      setCurrentState("GameResult");
      toast.info("Host terminated game");
    });
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
      }
    );
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

    return () => {
      socket.off("ws-player-hostCloseGame");
      socket.off("ws-host-playerJoinGame");
      socket.off("ws-host-updateProgress");
    };
  }, [socket]);

  useEffect(() => {
    if (problems.length > 0 && player) {
      fetch(GET_PLAYER_PROGRESS, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          gameId: player?.gameId,
        }),
      })
        .then((response) => response.json())
        .then((results) => {
          setPlayersProgress([]);
          results.progress.forEach(
            (res: {
              id: number;
              name: string;
              progress: string;
              finishedAt: Date;
            }) => {
              if (res.id === player.id) {
                setMyProgress({
                  id: res.id,
                  name: res.name,
                  finishedAt: res.finishedAt,
                  progress: res.progress
                    ? JSON.parse(res.progress)
                    : problems.map((p) => ({ id: p.id, passed: false })),
                });
              }
              setPlayersProgress((prev) => [
                ...prev,
                {
                  id: res.id,
                  name: res.name,
                  finishedAt: res.finishedAt,
                  progress: res.progress
                    ? JSON.parse(res.progress)
                    : problems.map((p) => ({ id: p.id, passed: false })),
                },
              ]);
            }
          );
          sortProgress();
        });
    }
  }, [problems]);

  const updateCode = (
    gameId: number,
    playerId: number,
    playerName: string,
    problemId: number,
    problemTitle: string,
    code: string
  ) => {
    socket.emit("ws-player-updateCode", {
      gameId,
      playerId,
      playerName,
      problemId,
      problemTitle,
      code,
    });
  };

  const debounceUpdateCode = useCallback(debounce(updateCode, 500), []);

  return (
    <m.div
      className="relative flex w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {bulletSwitch && <BulletScreen player={player} />}
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
        className={`text-dark-gray-8  shrink-0 bg-dark-layer-2 h-[calc(100vh-48px)] transition-all duration-500
        ${
          openPlayersBar
            ? "translate-x-0 w-[260px]"
            : "-translate-x-[100px] w-[0px]"
        }`}
      >
        <div className=" h-[40px] flex items-end border-dark-fill-2 px-3 relative">
          <h1 className="text-xl">Rank</h1>
          <div
            className="ml-1 transform transition-all duration-450 ease-in-out flex items-center justify-center h-9 w-9
             absolute rounded-lg bg-dark-fill-3 hover:bg-dark-fill-2 cursor-pointer z-10 top-[8px]
             right-[8px]"
            onClick={() => setOpenPlayersBar(false)}
          >
            <BsChevronUp className="text-white -rotate-90" />
          </div>
        </div>
        <div className="h-[calc(100vh-96px)] overflow-y-auto overflow-hidden rounded-b-lg">
          {playersProgress.map((playerProgress, id) => {
            const total = playerProgress.progress.length;
            const score = playerProgress.progress.reduce(
              (acc, cur) => (cur.passed ? acc + 1 : acc),
              0
            );
            return (
              <div
                className="w-full h-[56px] flex items-center px-[12px] mt-[8px]"
                key={id}
              >
                <div
                  className={`text-xl font-semibold ${
                    playerProgress.id === player.id
                      ? "text-dark-pink"
                      : "text-dark-yellow"
                  }`}
                >
                  {id + 1}
                </div>
                <div className="h-11 w-11 bg-dark-fill-2 rounded-full flex justify-center items-center overflow-hidden ml-3">
                  <img
                    src={`${PLAYER_AVATAR_URL}&seed=${playerProgress.name}`}
                    alt="avatar"
                    className="h-11"
                  />
                </div>
                <div
                  className={`text-lg ml-3 ${
                    playerProgress.id === player.id
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {playerProgress.name}
                </div>
                <div className=" ml-auto text-lg">
                  {score}/{total}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        {problems.length > 0 && myProgress && (
          <Split minSize={0} snapOffset={100} className="split">
            <div className="bg-dark-layer-1">
              <div className="flex h-10 w-full items-end bg-dark-layer-2 text-white overflow-x-auto no-scrollbar">
                {problems.map((problem, id) => (
                  <div
                    className={`flex items-center rounded-t-[5px] px-4 py-[7px] text-sm cursor-pointer ${
                      id === currentProblemId
                        ? "bg-dark-layer-1"
                        : "bg-dark-layer-2"
                    }`}
                    onClick={() => setCurrentProblemId(id)}
                    key={id}
                  >
                    {myProgress &&
                      myProgress.progress.map((progress, id) => (
                        <span
                          key={id}
                          className={`text-dark-green-s mr-1 ml-[-8px] ${
                            progress.id === problem.id && progress.passed
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          <BsCheck2Circle />
                        </span>
                      ))}
                    <span className="  whitespace-nowrap">Prob {id + 1}</span>
                  </div>
                ))}
              </div>
              <DescriptionArea problem={problems[currentProblemId]} />
            </div>
            <Playground
              problem={problems[currentProblemId]}
              gameMode={true}
              gameData={{
                player: player,
                myProgress: myProgress,
                setMyProgress: setMyProgress,
                updateCode: debounceUpdateCode,
              }}
            />
          </Split>
        )}
      </div>
    </m.div>
  );
};

export default GamePlaying;
