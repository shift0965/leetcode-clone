import { Request, Response, NextFunction } from "express";
import { redisClient } from "../models/redis.model.js";

export function rateLimit(limit: number) {
  return async function (req: Request, res: Response, next: NextFunction) {
    console.log("come in");
    try {
      const ip = req.ip;
      console.log(ip);
      const count = await redisClient.incr(ip);
      const exp = await redisClient.expire(ip, 1, "NX");
      if (count > limit) {
        return res.status(429).send({ errors: "Sending requests too often" });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
