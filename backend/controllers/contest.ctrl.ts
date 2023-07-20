import { NextFunction, Request, Response } from "express";
import { getTestCasesByProblemIdAndType } from "../models/problem.model.js";
import {
  publishPlayerJoinContest,
  publishPlayerExitContest,
  publishHostTerminateContest,
  publishHostStartContest,
  publishPlayerUpdateProgress,
  publishHostMessageToPlayer,
  getCodeByGameIdAndPlayerId,
  publishHostCloseContest,
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
  getTimeLimitAndStartAtById,
  getContestResultsById,
  closeContestById,
  getContestHistoryByUser,
  clearContestHistoryByUser,
} from "../models/contest.model.js";

import { getProblemDetailsById } from "../models/problem.model.js";
import { runCodeByWorker } from "../helpers/runcode.js";

export async function hostCheckContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const contest = await checkContestStateByUser(userId);
    if (!contest) return res.send({ founded: false });

    if (contest.state === "started") {
      const time = await getTimeLimitAndStartAtById(contest.contestId);
      if (
        time &&
        time.startedAt.getTime() + time.timeLimit * 60000 < new Date().getTime()
      ) {
        await closeContestById(contest.contestId);
        contest.state = "closed";
      }
    }
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
    const currentContest = await checkContestStateByUser(userId);
    if (currentContest) {
      return res.status(400).send({ errors: "You are running a contest now!" });
    }
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
    const contestId = req.body.gameId;
    const contest = await checkContestStateByIdAndPlayerId(contestId, playerId);
    if (!contest) return res.send({ founded: false });
    if (contest.state === "started") {
      const time = await getTimeLimitAndStartAtById(contest.contestId);
      if (
        time &&
        time.startedAt.getTime() + time.timeLimit * 60000 < new Date().getTime()
      ) {
        await closeContestById(contest.contestId);
        contest.state = "closed";
      }
    }

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

    const contest = await checkContestStateById(gameId);
    if (
      contest &&
      (contest.state === "created" || contest.state === "started")
    ) {
      const playerId = await insertPlayerIntoContest(contest.contestId, name);
      if (playerId === null)
        return res.status(500).send({ errors: "Insert Failed" });

      publishPlayerJoinContest(contest.contestId, playerId, name);
      res.send({ playerId: playerId, gameState: contest.state });
    } else {
      return res.status(404).send({ errors: "Game Id not exist" });
    }
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

  //check if contest is started
  const contest = await checkContestStateById(gameId); //insertPlayerIntoContest(contestId, name);
  if (!contest || contest.state !== "started")
    return res.status(404).send({ errors: "Game is not available" });

  const testCasesData = await getTestCasesByProblemIdAndType(
    problemId,
    "hidden"
  );
  if (testCasesData === null)
    return res.status(400).send({ errors: "Problem not found" });
  const { functionName, testCases, verifyVariable } = testCasesData;
  type Progress = { id: number; passed: boolean };
  try {
    const result = await runCodeByWorker(
      false,
      testCases,
      code,
      functionName,
      verifyVariable
    );

    //if there is no error and the result is correct
    if (result.type === "test" && result.data.passed) {
      let makeNewProgress = false;
      progress.forEach((pro: Progress) => {
        //if use make a progress
        if (pro.id === problemId && !pro.passed) {
          pro.passed = true;
          makeNewProgress = true;
        }
      });

      if (makeNewProgress) {
        const currentDate = new Date();
        setPlayerProgressById(playerId, JSON.stringify(progress));
        setPlayerFinished(currentDate, playerId);
        publishPlayerUpdateProgress(gameId, playerId, progress, currentDate);
        return res.status(200).send({
          type: "test",
          data: result.data,
          progress: progress,
          finishedAt: currentDate,
        });
      }
    }
    return res.status(200).send({
      type: result.type,
      data: result.data,
      progress: progress,
      finishedAt: finishedAt,
    });
  } catch (err) {
    next(err);
  }
}

export async function hostGetPlayersCode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const contest = await checkContestStateByUser(userId);
    if (!contest) return res.status(404).send({ errors: "No contest found" });
    const players = await getPlayersByContestId(contest.contestId);
    const playersCode = await Promise.all(
      players.map((player) =>
        getCodeByGameIdAndPlayerId(contest.contestId, player.id, player.name)
      )
    );
    res.send({ playersCode: playersCode });
  } catch (err) {
    return next(err);
  }
}

export async function getTimeLimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const contestId = req.body.gameId;
    const contest = await checkContestStateById(contestId);
    if (!contest || contest.state !== "started") {
      return res.send({
        endedAt: new Date().getTime(),
      });
    }
    const time = await getTimeLimitAndStartAtById(contestId);
    return res.send({
      endedAt: time.startedAt.getTime() + time.timeLimit * 60000,
    });
  } catch (err) {
    next(err);
  }
}

export async function hostSendMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const contestId = req.body.gameId;
    const playerId = req.body.playerId;
    const message = req.body.message;
    publishHostMessageToPlayer(contestId, playerId, message);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export async function getContestResult(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const contestId = req.body.gameId;
    const { time, problems, players } = await getContestResultsById(contestId);

    problems.sort((a, b) => a.id - b.id);
    const playerResults = players.map((player) => {
      const PlayerResult = {
        id: player.id,
        name: player.name,
        timeUsed: player.finishedAt
          ? (player.finishedAt.getTime() - time.startedAt.getTime()) / 1000
          : null,
      };

      if (player.progress) {
        const progress: { id: number; passed: boolean }[] = JSON.parse(
          player.progress
        );
        progress.sort((a, b) => a.id - b.id);
        return {
          ...PlayerResult,
          progress: progress.map((pro) => pro.passed),
        };
      } else {
        const progress = Array(problems.length).fill(false);
        return {
          ...PlayerResult,
          progress: progress,
        };
      }
    });

    playerResults.sort((a, b) => {
      const scoreA = a.progress.reduce((acc, cur) => (cur ? acc + 1 : acc), 0);
      const scoreB = b.progress.reduce((acc, cur) => (cur ? acc + 1 : acc), 0);
      if (scoreA !== scoreB) return scoreB - scoreA;
      else {
        if (a.timeUsed && b.timeUsed) {
          return a.timeUsed - b.timeUsed;
        } else return 0;
      }
    });

    res.send({ problems: problems, players: playerResults });
  } catch (err) {
    next(err);
  }
}

export async function hostCloseContest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const contestId = req.body.gameId;
    await closeContestById(contestId);
    const players = await getPlayersByContestId(contestId);
    if (players.length === 0) {
      await endContestByIdAndUserId(contestId, userId);
      return res.status(400).send({ errors: "Game room not found" });
    }
    publishHostCloseContest(contestId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}

export async function hostGetHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    const hostHistory = await getContestHistoryByUser(userId);
    res.send(hostHistory);
  } catch (err) {
    next(err);
  }
}

export async function hostClearHistory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.userId;
    await clearContestHistoryByUser(userId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
}
