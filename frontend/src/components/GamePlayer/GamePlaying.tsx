import { useEffect, useState, useRef } from "react";
import {
  GET_CONTEST_PROBLEMS,
  GET_PLAYER_PROGRESS,
  WEB_SOCKET_URL,
} from "../../api.const";
import { Player, PlayerProgress, ProblemDetails } from "../../types.const";
import Split from "react-split";
import Playground from "../Workspace/Playground";
import { BsCheck2Circle } from "react-icons/bs";
import DescriptionArea from "../Workspace/DescriptionArea";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface GamePlayingProps {
  player: Player;
  //setCurrentState: React.Dispatch<React.SetStateAction<GamePlayerState>>;
}

const GamePlaying = ({ player }: GamePlayingProps) => {
  const [problems, setProblems] = useState<ProblemDetails[]>([]);
  const [currentProblemId, setCurrentProblemId] = useState<number>(0);
  const [myProgress, setMyProgress] = useState<PlayerProgress>();
  //const [playersProgress, setPlayersProgress] = useState<PlayerProgress[]>([]);
  const socket = useRef(io(WEB_SOCKET_URL)).current;
  const navigate = useNavigate();

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
    socket.on("ws-player-hostTerminateGame", function () {
      toast.info("Host terminated game");
      localStorage.removeItem("playerData");
      navigate("/");
    });

    return () => {
      socket.off("ws-player-hostTerminateGame");
    };
  }, []);

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
          //setPlayersProgress([]);
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
              // setPlayersProgress((prev) => [
              //   ...prev,
              //   {
              //     id: res.id,
              //     name: res.name,
              //     finishedAt: res.finishedAt,
              //     progress: res.progress
              //       ? JSON.parse(res.progress)
              //       : problems.map((p) => ({ id: p.id, passed: false })),
              //   },
              // ]);
            }
          );
        });
    }
  }, [problems]);

  return (
    <div>
      {problems.length > 0 && myProgress && (
        <Split minSize={0} snapOffset={100} className="split">
          <div className="bg-dark-layer-1">
            <div className="flex h-10 w-full items-end bg-dark-layer-2 text-white overflow-x-hidden">
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
                  <span>Prob {id + 1}</span>
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
            }}
          />
        </Split>
      )}
    </div>
  );
};

export default GamePlaying;
