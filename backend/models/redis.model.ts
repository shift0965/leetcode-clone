import Redis from "ioredis";

const client = new Redis({
  host: "localhost",
  port: 6379,
});

export async function hostCreateRoom(roomId: string) {
  console.log(roomId);
  const addRoom = await client.sadd("gameRooms", [roomId]);
  //if already exists
  if (addRoom === 0) return false;

  await client.expire("gameRooms", 10);
  await client.publish("host-createRoom", JSON.stringify({ roomId: roomId }));
  return true;
}
export function playerJoinRoom(message: string) {
  redisClient.publish("player-joinRoom", message);
}
