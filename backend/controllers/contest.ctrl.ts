import { Express, Request, Response } from "express";
import { validationResult } from "express-validator";

import { randomUUID } from "crypto";
import { hostCreateRoom, playerJoinRoom } from "../models/redis.model.js";
import {
  createContest,
  insertPlayerIntoContest,
  checkContestAvailability,
} from "../models/contest.model.js";

export async function hostCreateContest(req: Request, res: Response) {
  const { userId, timeLimit, problemList } = req.body;
  console.log(userId, timeLimit, problemList);
  const contestId = await createContest(userId, timeLimit, problemList);
  if (contestId === null)
    return res.status(500).send({ error: "Not able to create room" });
  hostCreateRoom(contestId);
  console.log("Create Game");
  res.cookie("hostContestId", contestId);
  res.send({ roomId: contestId });
}

export async function playerJoinContest(req: Request, res: Response) {
  const roomId = req.body.roomId;
  const name = req.body.userName;

  const contestId = await checkContestAvailability(roomId); //insertPlayerIntoContest(contestId, name);
  if (contestId === undefined)
    return res.status(404).send({ message: "Room Id Not Avaiable" });

  const playerId = await insertPlayerIntoContest(contestId, name);
  if (playerId === null)
    return res.status(500).send({ message: "Insert Failed" });

  playerJoinRoom(contestId, playerId, name);
  res.cookie("contestPlayer", { playerName: name, playerId: playerId });
  res.send({ playerId: playerId });
}
