import { Express, Request, Response } from "express";
import { validationResult } from "express-validator";

import { randomUUID } from "crypto";
import { hostCreateRoom, playerJoinRoom } from "../models/redis.model.js";
import { createContest } from "../models/contest.model.js";

export async function createGame(req: Request, res: Response) {
  const { userId, timeLimit, problemList } = req.body;
  console.log(userId, timeLimit, problemList);
  const contestId = createContest(userId, timeLimit, problemList);

  hostCreateRoom(String(contestId));
  console.log("Create Game");
  res.cookie("RoomId", contestId);
  res.send({ roomId: contestId });
}

export async function joinGame(req: Request, res: Response) {
  const roomId = req.body.roomId;
  const userName = req.body.userName;
  const userId = randomUUID();
  console.log(roomId, userName, userId);
  playerJoinRoom(
    JSON.stringify({ roomId: roomId, playerId: userId, playerName: userName })
  );
  console.log("Join Game");
  res.send({ success: "Join Success" });
}
