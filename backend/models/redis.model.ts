import { Redis } from "ioredis";

const client = new Redis({
  host: "localhost",
  port: 6379,
});

export async function hostCreateRoom(contestId: number) {
  client.publish("host-createRoom", JSON.stringify({ contestId: contestId }));
}
export function playerJoinRoom(
  contestId: number,
  playerId: number,
  name: string
) {
  client.publish(
    "player-joinRoom",
    JSON.stringify({
      contestId: contestId,
      playerId: playerId,
      playerName: name,
    })
  );
}
