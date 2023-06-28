import { NextFunction, Request, Response } from "express";
import { getTestCasesByProblemId } from "../models/problem.model.js";
import {
  publishPlayerJoinContest,
  publishPlayerExitContest,
  publishHostTerminateContest,
  publishHostStartContest,
  publishPlayerUpdateProgress,
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
  startContestByIdAndUserId,
  getContestProblemsById,
  getPlayersProgressById,
  setPlayerProgressById,
  setPlayerFinished,
} from "../models/contest.model.js";

import { getProblemDetailsById } from "../models/problem.model.js";
import { generateFile, removeFile } from "../helpers/filesHelper.js";
import { verifyTestCases } from "../helpers/runCode.js";

export async function hostCheckContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const contest = await checkContestStateByUser(userId);
    if (!contest) return res.send({ founded: false });
    return res.send({
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
    const contestId = req.body.gameId;
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
    if (contest === undefined || contest.state === "ended")
      return res.status(404).send({ errors: "Game Id not exist" });

    const playerId = await insertPlayerIntoContest(contest.contestId, name);
    if (playerId === null)
      return res.status(500).send({ errors: "Insert Failed" });

    publishPlayerJoinContest(contest.contestId, playerId, name);
    res.cookie("contestPlayer", { playerName: name, playerId: playerId });
    res.send({ playerId: playerId, gameState: contest.state });
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

export async function hostStartContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const contestId = req.body.gameId;
    await startContestByIdAndUserId(contestId, userId);
    publishHostStartContest(contestId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export async function getProblems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const contestId = req.body.gameId;
    const problems = await getContestProblemsById(contestId);
    const problemDetails = await Promise.all(
      problems.map((id) => getProblemDetailsById(id))
    );

    res.send({ problems: problemDetails });
  } catch (err) {
    next(err);
  }
}

export async function getPlayersProgress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const contestId = req.body.gameId;
    const progress = await getPlayersProgressById(contestId);
    res.send({ progress: progress });
  } catch (err) {
    next(err);
  }
}

export async function playerSubmit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { problemId, language, code, gameId, playerId, progress, finishedAt } =
    req.body;
  const testCasesData = await getTestCasesByProblemId(problemId);
  if (testCasesData === null)
    return res.status(400).send({ errors: "Problem not found" });
  const { functionName, testCases } = testCasesData;
  const ifRecordConsole = false;
  const filePath = await generateFile(
    language,
    code,
    functionName,
    ifRecordConsole
  );
  type Progress = { id: number; passed: boolean };
  try {
    const result = await verifyTestCases(testCases, filePath);

    if (finishedAt)
      return res
        .status(200)
        .send({ ...result, progress: progress, finishedAt: finishedAt });

    let newFinishedAt = null;
    if (result.passed) {
      progress.forEach((pro: Progress) => {
        if (pro.id === problemId && !pro.passed) {
          pro.passed = true;
        }
      });
    }
    setPlayerProgressById(playerId, JSON.stringify(progress));

    if (progress.reduce((acc: boolean, cur: Progress) => cur.passed && acc)) {
      newFinishedAt = new Date();
      setPlayerFinished(newFinishedAt, playerId);
    }
    publishPlayerUpdateProgress(gameId, playerId, progress, finishedAt);
    return res
      .status(200)
      .send({ ...result, progress: progress, finishedAt: finishedAt });
  } catch (err) {
    next(err);
  } finally {
    await removeFile(filePath);
  }
}
