import pool from "./databasePool.js";
import { z } from "zod";
import { ResultSetHeader } from "mysql2";

function instanceOfSetHeader(object: any): object is ResultSetHeader {
  return "insertId" in object;
}

export async function checkContestStateByUser(userId: number) {
  const results = await pool.query(
    "SELECT id AS contestId, state FROM contest WHERE user_id = ? AND state != ?",
    [userId, "ended"]
  );
  const contests = z.array(ContestIdSchema).parse(results[0]);
  return contests[0];
}

export async function checkContestStateById(contestId: number) {
  const results = await pool.query(
    "SELECT id AS contestId, state FROM contest WHERE id = ?",
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
    "SELECT c.id AS contestId, c.state FROM contest AS c JOIN contest_player AS cp ON c.id = cp.contest_id WHERE cp.id = ? AND c.id = ? AND c.state != ? AND cp.state = ?",
    [playerId, contestId, "ended", "joined"]
  );
  const contests = z.array(ContestIdSchema).parse(results[0]);
  return contests[0];
}

export async function createContest(
  userId: number,
  timeLimit: number,
  problemIds: number[]
) {
  const insertContest = await pool.query(
    "insert into contest (user_id, time_limit_mins, state) VALUES (?,?,?)",
    [userId, timeLimit, "created"]
  );
  if (Array.isArray(insertContest) && instanceOfSetHeader(insertContest[0])) {
    const contestId = insertContest[0].insertId;
    const problemBulk = problemIds.map((problemId) => [contestId, problemId]);

    await pool.query(
      "insert into contest_problem (contest_id, problem_id) values ?",
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
      "SELECT COUNT(id) AS playerNumber FROM contest_player WHERE contest_id = ?",
      [contestId]
    );
    const count = z
      .array(z.object({ playerNumber: z.number() }))
      .parse(countResult[0]);
    if (count[0].playerNumber > 12) throw new Error("Game Room Full");
    const insertContest = await pool.query(
      "INSERT INTO contest_player (contest_id, name, state) VALUES (?,?,?)",
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
    "select id, contest_id AS contestId, name from contest_player where contest_id = ? AND state = ?",
    [contestId, "joined"]
  );
  const contests = z.array(PlayerSchema).parse(results[0]);
  return contests;
}

export async function endContestByIdAndUserId(
  contestId: number,
  userId: string
) {
  const results = await pool.query(
    "UPDATE contest SET state = ? WHERE id = ? AND user_id = ?",
    ["ended", contestId, userId]
  );
}

export async function closeContestById(contestId: number) {
  const results = await pool.query(
    "UPDATE contest SET state = ? WHERE id = ?",
    ["closed", contestId]
  );
}

export async function ExitContestByIdAndPlayerId(
  contestId: number,
  playerId: number
) {
  await pool.query(
    "UPDATE contest_player SET state = ? WHERE id = ? AND contest_id = ?",
    ["exited", playerId, contestId]
  );
}

export async function startContestByIdAndUserId(
  contestId: number,
  userId: string
) {
  const results = await pool.query(
    "UPDATE contest SET state = ?, started_at = ? WHERE id = ? AND user_id = ? AND state = ?",
    ["started", new Date(), contestId, userId, "created"]
  );
}

export async function getContestProblemsById(contestId: number) {
  const results = await pool.query(
    "SELECT cp.problem_id AS id FROM contest AS c JOIN contest_problem AS cp ON c.id = cp.contest_id WHERE c.id = ? AND c.state != ?",
    [contestId, "ended"]
  );
  const problems = z.array(ProblemIdSchema).parse(results[0]);
  return problems.map((problem) => problem.id);
}

export async function getPlayersProgressById(contestId: number) {
  const results = await pool.query(
    "SELECT id, name, progress, finished_at AS finishedAt FROM contest_player WHERE contest_id=? AND state=?",
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
    "UPDATE contest_player SET progress = ? WHERE id=?",
    [progress, playerId]
  );
}

export async function getTimeLimitAndStartAtById(contestId: number) {
  const results = await pool.query(
    "SELECT time_limit_mins AS timeLimit, started_at AS startedAt FROM contest WHERE id = ? AND state = ?",
    [contestId, "started"]
  );
  const time = z.array(contestTimeSchema).parse(results[0]);
  return time[0];
}

export async function setPlayerFinished(finished_at: Date, playerId: number) {
  const results = await pool.query(
    "UPDATE contest_player SET finished_at = ? WHERE id=?",
    [finished_at, playerId]
  );
}

export async function getContestResultsById(contestId: number) {
  const contestTimeResults = await pool.query(
    "SELECT c.time_limit_mins AS timeLimit, c.started_at AS startedAt FROM contest AS c WHERE c.id = ?",
    [contestId]
  );
  const contestProblems = await pool.query(
    "SELECT cp.problem_id AS id, p.title AS title FROM contest AS c JOIN contest_problem AS cp ON c.id = cp.contest_id JOIN problem AS p ON cp.problem_id = p.id WHERE c.id = ?",
    [contestId]
  );
  const playerResults = await pool.query(
    "SELECT id, name, progress, finished_at AS finishedAt FROM contest_player WHERE contest_id=? AND state=?",
    [contestId, "joined"]
  );
  const times = z.array(contestTimeSchema).parse(contestTimeResults[0]);
  const problems = z.array(problemResultsSchema).parse(contestProblems[0]);
  const players = z.array(ProgressSchema).parse(playerResults[0]);
  return { time: times[0], problems, players };
}

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
