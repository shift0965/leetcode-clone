import { useEffect, useState, useRef } from "react";
import { PlayerProgress, ProblemDetails } from "../../types.const";
import { io } from "socket.io-client";
import {
  GET_CONTEST_PROBLEMS,
  GET_PLAYER_PROGRESS,
  PLAYER_AVATAR_URL,
  WEB_SOCKET_URL,
} from "../../api.const";

interface GameWatchingProps {
  gameId: number;
}

const GameWatching = ({ gameId }: GameWatchingProps) => {
  const [playersProgress, setPlayersProgress] = useState<PlayerProgress[]>([]);
  const [problems, setProblems] = useState<ProblemDetails[]>([]);
  const socket = useRef(io(WEB_SOCKET_URL)).current;

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
      }
    );

    socket.on(
      "ws-host-playerExitGame",
      function (exitedPlayer: { id: number }) {
        setPlayersProgress((prev) =>
          prev.filter((player) => player.id != exitedPlayer.id)
        );
      }
    );

    return () => {
      socket.off("ws-player-updateProgress");
    };
  }, []);

  useEffect(() => {
    if (problems.length > 0) {
      fetch(GET_PLAYER_PROGRESS, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          gameId: gameId,
        }),
      })
        .then((response) => response.json())
        .then((results) => {
          setPlayersProgress([]);
          console.log(results);
          results.progress.forEach(
            (res: {
              id: number;
              name: string;
              progress: string;
              finishedAt: Date | null;
            }) => {
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
        });
    }
  }, [problems]);

  return (
    <div>
      <div className=" text-dark-gray-8 w-96 mx-auto mt-20">
        {playersProgress.map((player, id) => {
          const total = player.progress.length;
          const score = player.progress.reduce(
            (acc, cur) => (cur.passed ? acc + 1 : acc),
            0
          );
          return (
            <div
              className=" h-20 flex items-center bg-dark-fill-3 rounded-md px-4"
              key={id}
            >
              <div className="text-2xl">{id + 1}</div>
              <div className="h-16 w-16 bg-dark-fill-2 rounded-full flex justify-center items-center overflow-hidden ml-4">
                <img
                  src={`${PLAYER_AVATAR_URL}&seed=${player.name}`}
                  alt="avatar"
                  className="h-14"
                />
              </div>
              <div className="text-2xl ml-4">{player.name}</div>
              <div className=" ml-auto text-xl">
                {score}/{total}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameWatching;
