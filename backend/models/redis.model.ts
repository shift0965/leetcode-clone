import { Redis } from "ioredis";

const client = new Redis({
  host: "localhost",
  port: 6379,
});

export function publishPlayerJoinContest(
  contestId: number,
  playerId: number,
  name: string
) {
  client.publish(
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
  client.publish(
    "ps-player-exitGame",
    JSON.stringify({
      contestId: contestId,
      id: playerId,
    })
  );
}

export async function publishHostTerminateContest(contestId: number) {
  client.publish(
    "ps-host-terminateGame",
    JSON.stringify({
      contestId: contestId,
    })
  );
}

export async function publishHostStartContest(contestId: number) {
  client.publish(
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
  client.publish(
    "ps-player-updateProgress",
    JSON.stringify({
      contestId: contestId,
      playerId: playerId,
      progress: progress,
      finishedAt: finishedAt,
    })
  );
}

type Progress = { id: number; passed: boolean };
