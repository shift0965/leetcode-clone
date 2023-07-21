import pool from "./databasePool.js";
import { z } from "zod";
import { ResultSetHeader } from "mysql2";
import { OkPacket } from "mysql2";
import "dotenv/config.js";

const MAX_PLAYER_NUMBER = Number(process.env.MAX_PLAYER_NUMBER) || 0;

function instanceOfSetHeader(object: any): object is ResultSetHeader {
  return "insertId" in object;
}

export async function checkContestStateByUser(userId: number) {
  const results = await pool.query(
    `
    SELECT id AS contestId, state 
    FROM contest 
    WHERE user_id = ? AND state IN ('created', 'started', 'closed')`,
    [userId]
  );
  const contests = z.array(ContestIdSchema).parse(results[0]);
  return contests[0];
}

export async function checkContestStateById(contestId: number) {
  const results = await pool.query(
    `
    SELECT id AS contestId, state 
    FROM contest 
    WHERE id = ?`,
    [contestId]
  );
  const contests = z.array(ContestIdSchema).parse(results[0]);
  return contests[0];
}

export async function checkContestStateByIdAndPlayerId(
  contestId: number,
  playerId: number
) {
  const results = await pool.query(
    `
    SELECT c.id AS contestId, c.state 
    FROM contest AS c 
    JOIN contest_player AS cp ON c.id = cp.contest_id 
    WHERE cp.id = ? AND c.id = ? AND cp.state = ?`,
    [playerId, contestId, "joined"]
  );
  const contests = z.array(ContestIdSchema).parse(results[0]);
  return contests[0];
}

export async function createContest(
  userId: number,
  timeLimit: number,
  problemIds: number[]
) {
  const problemsResult = await pool.query(
    `
    SELECT id 
    FROM problem WHERE id IN ?`,
    [[problemIds]]
  );
  if (
    z.array(z.object({ id: z.number() })).parse(problemsResult[0]).length !==
    problemIds.length
  ) {
    throw new Error("Problems not found");
  }

  const insertContest = await pool.query(
    `
    INSERT INTO contest (user_id, time_limit_mins, state) 
    VALUES (?,?,?)`,
    [userId, timeLimit, "created"]
  );
  if (Array.isArray(insertContest) && instanceOfSetHeader(insertContest[0])) {
    const contestId = insertContest[0].insertId;
    const problemBulk = problemIds.map((problemId) => [contestId, problemId]);
    await pool.query(
      "INSERT INTO contest_problem (contest_id, problem_id) VALUES ?",
      [problemBulk]
    );
    return contestId;
  }
  throw new Error("Not able to create room");
}

export async function insertPlayerIntoContest(contestId: number, name: string) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const countResult = await connection.query(
      `
      SELECT COUNT(id) AS playerNumber 
      FROM contest_player 
      WHERE contest_id = ?`,
      [contestId]
    );
    const count = z
      .array(z.object({ playerNumber: z.number() }))
      .parse(countResult[0]);
    if (count[0].playerNumber >= MAX_PLAYER_NUMBER)
      throw new Error("Game Room Full");
    const insertContest = await pool.query(
      `INSERT INTO contest_player (contest_id, name, state) VALUES (?,?,?)`,
      [contestId, name, "joined"]
    );
    if (Array.isArray(insertContest) && instanceOfSetHeader(insertContest[0])) {
      await connection.commit();
      return insertContest[0].insertId;
    } else throw new Error("Join Room Failed");
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

export async function getPlayersByContestId(contestId: number) {
  const results = await pool.query(
    `
    SELECT id, contest_id AS contestId, name 
    FROM contest_player 
    WHERE contest_id = ? AND state = ?`,
    [contestId, "joined"]
  );
  const contests = z.array(PlayerSchema).parse(results[0]);
  return contests;
}

export async function endContestByIdAndUserId(
  contestId: number,
  userId: number
) {
  const results = await pool.query<OkPacket>(
    `
    UPDATE contest SET state = ? 
    WHERE id = ? 
    AND user_id = ?`,
    ["ended", contestId, userId]
  );
  if (results[0].affectedRows === 0) throw new Error("Game Not Found");
}

export async function closeContestById(contestId: number) {
  const results = await pool.query<OkPacket>(
    `
    UPDATE contest SET state = ? 
    WHERE id = ?`,
    ["closed", contestId]
  );
  if (results[0].affectedRows === 0) throw new Error("Game Not Found");
}

export async function ExitContestByIdAndPlayerId(
  contestId: number,
  playerId: number
) {
  await pool.query(
    `
    UPDATE contest_player 
    SET state = ? 
    WHERE id = ? AND contest_id = ?`,
    ["exited", playerId, contestId]
  );
}

export async function startContestByIdAndUserId(
  contestId: number,
  userId: string
) {
  const results = await pool.query<OkPacket>(
    `
    UPDATE contest SET state = ?, started_at = ? 
    WHERE id = ? AND user_id = ? AND state = ?`,
    ["started", new Date(), contestId, userId, "created"]
  );
  if (results[0].affectedRows === 0) throw new Error("Game Not Found");
}

export async function getContestProblemsById(contestId: number) {
  const results = await pool.query(
    `
    SELECT cp.problem_id AS id 
    FROM contest AS c JOIN contest_problem AS cp ON c.id = cp.contest_id 
    WHERE c.id = ?`,
    [contestId]
  );
  const problems = z.array(ProblemIdSchema).parse(results[0]);
  return problems.map((problem) => problem.id);
}

export async function getPlayersProgressById(contestId: number) {
  const results = await pool.query(
    `
    SELECT id, name, progress, finished_at AS finishedAt 
    FROM contest_player WHERE contest_id=? AND state=?`,
    [contestId, "joined"]
  );
  const progress = z.array(ProgressSchema).parse(results[0]);
  return progress;
}

export async function setPlayerProgressById(
  playerId: number,
  progress: string
) {
  const results = await pool.query(
    `
    UPDATE contest_player SET progress = ? 
    WHERE id=?`,
    [progress, playerId]
  );
}

export async function getTimeLimitAndStartAtById(contestId: number) {
  const results = await pool.query(
    `
    SELECT time_limit_mins AS timeLimit, started_at AS startedAt 
    FROM contest 
    WHERE id = ? AND state = ?`,
    [contestId, "started"]
  );
  const time = z.array(contestTimeSchema).parse(results[0]);
  return time[0];
}

export async function setPlayerFinished(finished_at: Date, playerId: number) {
  const results = await pool.query(
    `
    UPDATE contest_player SET finished_at = ? 
    WHERE id=?`,
    [finished_at, playerId]
  );
}

export async function getContestResultsById(contestId: number) {
  const contestTimeResults = await pool.query(
    `
    SELECT c.time_limit_mins AS timeLimit, c.started_at AS startedAt 
    FROM contest AS c 
    WHERE c.id = ?`,
    [contestId]
  );
  const contestProblems = await pool.query(
    `
    SELECT cp.problem_id AS id, p.title AS title 
    FROM contest AS c 
    JOIN contest_problem AS cp ON c.id = cp.contest_id 
    JOIN problem AS p ON cp.problem_id = p.id 
    WHERE c.id = ?`,
    [contestId]
  );
  const playerResults = await pool.query(
    `
    SELECT id, name, progress, finished_at AS finishedAt 
    FROM contest_player 
    WHERE contest_id=? AND state=?`,
    [contestId, "joined"]
  );
  const times = z.array(contestTimeSchema).parse(contestTimeResults[0]);
  const problems = z.array(problemResultsSchema).parse(contestProblems[0]);
  const players = z.array(ProgressSchema).parse(playerResults[0]);
  return { time: times[0], problems, players };
}

export async function getContestHistoryByUser(userId: number) {
  const contestProblemsResults = await pool.query(
    `
    SELECT c.id AS contestId, c.started_at AS startedAt, p.id AS problemId, p.title as problemTitle 
    FROM contest AS c JOIN contest_problem AS cp ON c.id = cp.contest_id 
    JOIN problem AS p on cp.problem_id = p.id 
    WHERE c.started_at IS NOT NULL AND c.user_id = ? AND c.state = ? ORDER BY c.started_at DESC`,
    [userId, "ended"]
  );
  const problems = z
    .array(historyProblemResultsSchema)
    .parse(contestProblemsResults[0]);

  const contestPlayerResults = await pool.query(
    `
    SELECT c.id as contestId, cp.name AS playerName, cp.progress AS progress, cp.finished_at AS finishedAt 
    FROM contest AS c JOIN contest_player AS cp ON c.id = cp.contest_id 
    WHERE c.started_at IS NOT NULL AND c.user_id = ?`,
    [userId]
  );

  const players = z
    .array(historyPlayerResultsSchema)
    .parse(contestPlayerResults[0]);

  players.sort((a, b) => {
    const scoreA = a.progress
      ? JSON.parse(a.progress).reduce(
          (acc: number, pro: { passed: boolean }) =>
            pro.passed ? acc + 1 : acc,
          0
        )
      : 0;
    const scoreB = b.progress
      ? JSON.parse(b.progress).reduce(
          (acc: number, pro: { passed: boolean }) =>
            pro.passed ? acc + 1 : acc,
          0
        )
      : 0;
    if (scoreA === scoreB) {
      if (a.finishedAt && b.finishedAt)
        return a.finishedAt.getTime() - b.finishedAt.getTime();
      else return 0;
    } else return scoreB - scoreA;
  });

  const contestMap = new Map();
  problems.forEach((problem) => {
    const contest = contestMap.get(problem.contestId) || {
      startedAt: problem.startedAt,
      contestId: problem.contestId,
      problems: [],
      players: [],
    };
    contest.problems.push({
      id: problem.problemId,
      title: problem.problemTitle,
    });
    contestMap.set(problem.contestId, contest);
  });
  players.forEach((player) => {
    const contest = contestMap.get(player.contestId);
    contest?.players.push({
      name: player.playerName,
    });
  });
  return Array.from(contestMap.values()).filter(
    (contest) => contest.players.length > 0
  );
}

export async function clearContestHistoryByUser(userId: number) {
  const results = await pool.query<OkPacket>(
    `
    UPDATE contest SET state = ? 
    WHERE user_id = ?`,
    ["cleared", userId]
  );
  if (results[0].affectedRows === 0) throw new Error("Game Not Found");
}

const historyProblemResultsSchema = z.object({
  contestId: z.number(),
  startedAt: z.date(),
  problemId: z.number(),
  problemTitle: z.string(),
});

const historyPlayerResultsSchema = z.object({
  contestId: z.number(),
  playerName: z.string(),
  progress: z.string().nullable(),
  finishedAt: z.date().nullable(),
});

const problemResultsSchema = z.object({
  id: z.number(),
  title: z.string(),
});

const contestTimeSchema = z.object({
  timeLimit: z.number(),
  startedAt: z.date(),
});

const ProgressSchema = z.object({
  id: z.number(),
  name: z.string(),
  progress: z.string().nullable(),
  finishedAt: z.date().nullable(),
});
const ProblemIdSchema = z.object({
  id: z.number(),
});

const ContestIdSchema = z.object({
  contestId: z.number(),
  state: z.string(),
});

const PlayerSchema = z.object({
  id: z.number(),
  name: z.string(),
  contestId: z.number(),
});
