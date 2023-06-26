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
    "select id AS contestId, state from contest where id = ?",
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
    "insert into contest (user_id, time_limit_mins, state) values (?,?,?)",
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
  const insertContest = await pool.query(
    "insert into contest_player (contest_id, name, state) values (?,?,?)",
    [contestId, name, "joined"]
  );
  if (Array.isArray(insertContest) && instanceOfSetHeader(insertContest[0])) {
    return insertContest[0].insertId;
  }
  return null;
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

export async function ExitContestByIdAndPlayerId(
  contestId: number,
  playerId: number
) {
  console.log(contestId, playerId);
  await pool.query(
    "UPDATE contest_player SET state = ? WHERE id = ? AND contest_id = ?",
    ["exited", playerId, contestId]
  );
}

const ContestIdSchema = z.object({
  contestId: z.number(),
  state: z.string(),
});

const PlayerSchema = z.object({
  id: z.number(),
  name: z.string(),
  contestId: z.number(),
});
