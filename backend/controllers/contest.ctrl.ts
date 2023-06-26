import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  publishPlayerJoinContest,
  publishPlayerExitContest,
  publishHostTerminateContest,
} from "../models/redis.model.js";
import {
  createContest,
  insertPlayerIntoContest,
  checkContestStateById,
  checkContestStateByUser,
  checkContestStateByIdAndPlayerId,
  getPlayersByContestId,
  endContestByIdAndUserId,
  ExitContestByIdAndPlayerId,
} from "../models/contest.model.js";

export async function hostCheckContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const contest = await checkContestStateByUser(userId);
    if (!contest) return res.send({ founded: false });
    res.send({
      founded: true,
      contestId: contest.contestId,
      state: contest.state,
    });
  } catch (err) {
    next(err);
  }
}

export async function hostCreateContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { timeLimit, problemList } = req.body;
    const userId = res.locals.userId;
    const contestId = await createContest(userId, timeLimit, problemList);
    res.send({ gameId: contestId });
  } catch (err) {
    next(err);
  }
}

export async function getPlayers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const contestId = req.body.contestId;
    const players = await getPlayersByContestId(contestId);
    res.send({
      players: players.map((player) => ({
        id: player.id,
        name: player.name,
        gameId: player.contestId,
      })),
    });
  } catch (err) {
    next(err);
  }
}

export async function playerCheckContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const playerId = req.body.playerId;
    const contestId = req.body.contestId;
    const contest = await checkContestStateByIdAndPlayerId(contestId, playerId);
    if (!contest) return res.send({ founded: false });
    res.send({
      founded: true,
      contestId: contest.contestId,
      state: contest.state,
    });
  } catch (err) {
    next(err);
  }
}

export async function hostTerminateContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const contestId = req.body.gameId;
    await endContestByIdAndUserId(contestId, userId);
    publishHostTerminateContest(contestId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export async function playerJoinContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const gameId = req.body.gameId;
    const name = req.body.playerName;

    const contest = await checkContestStateById(gameId); //insertPlayerIntoContest(contestId, name);
    if (contest === undefined)
      return res.status(404).send({ errors: "Game Id not exist" });

    const playerId = await insertPlayerIntoContest(contest.contestId, name);
    if (playerId === null)
      return res.status(500).send({ errors: "Insert Failed" });

    publishPlayerJoinContest(contest.contestId, playerId, name);
    res.cookie("contestPlayer", { playerName: name, playerId: playerId });
    res.send({ playerId: playerId });
  } catch (err) {
    next(err);
  }
}

export async function playerExitContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const contestId = req.body.gameId;
    const playerId = req.body.playerId;
    await ExitContestByIdAndPlayerId(contestId, playerId);
    publishPlayerExitContest(contestId, playerId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}
