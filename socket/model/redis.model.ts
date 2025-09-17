import { Redis } from "ioredis";

export const redisClient = new Redis({
  host: "redis",
  port: 6379,
});

export const redisPubsub = new Redis({
  host: "redis",
  port: 6379,
});
