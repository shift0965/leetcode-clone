import { Redis } from "ioredis";
import dotenv from "dotenv";
dotenv.config();

export const redisSub = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});
export const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});

export function publishPlayerJoinContest(
  contestId: number,
  playerId: number,
  name: string
) {
  redisClient.publish(
    "ps-player-joinGame",
    JSON.stringify({
      contestId: contestId,
      id: playerId,
      name: name,
    })
  );
}

export async function publishPlayerExitContest(
  contestId: number,
  playerId: number
) {
  redisClient.publish(
    "ps-player-exitGame",
    JSON.stringify({
      contestId: contestId,
      id: playerId,
    })
  );
}

export async function publishHostTerminateContest(contestId: number) {
  redisClient.publish(
    "ps-host-terminateGame",
    JSON.stringify({
      contestId: contestId,
    })
  );
}

export async function publishHostCloseContest(contestId: number) {
  redisClient.publish(
    "ps-host-closeGame",
    JSON.stringify({
      contestId: contestId,
    })
  );
}

export async function publishHostStartContest(contestId: number) {
  redisClient.publish(
    "ps-host-startGame",
    JSON.stringify({
      contestId: contestId,
    })
  );
}

export async function publishPlayerUpdateProgress(
  contestId: number,
  playerId: number,
  progress: Progress,
  finishedAt: Date | null
) {
  redisClient.publish(
    "ps-player-updateProgress",
    JSON.stringify({
      contestId: contestId,
      playerId: playerId,
      progress: progress,
      finishedAt: finishedAt,
    })
  );
}

export async function getCodeByGameIdAndPlayerId(
  contestId: number,
  playerId: number,
  playerName: string
) {
  const key = `playersCode-${contestId}-${playerId}`;
  const playerCodeJson = await redisClient.get(key);
  if (playerCodeJson) {
    return JSON.parse(playerCodeJson);
  } else return { id: playerId, name: playerName, problems: [] };
}

export async function publishHostMessageToPlayer(
  contestId: number,
  playerId: number,
  message: string
) {
  redisClient.publish(
    "ps-host-sendMessageToPlayer",
    JSON.stringify({
      contestId: contestId,
      playerId: playerId,
      message: message,
    })
  );
}

type Progress = { id: number; passed: boolean };
