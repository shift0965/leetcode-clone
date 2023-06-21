import pool from "./databasePool.js";
import { z } from "zod";
import { ResultSetHeader } from "mysql2";

function instanceOfSetHeader(object: any): object is ResultSetHeader {
  return "insertId" in object;
}

export async function createContest(
  userId: number,
  timeLimit: number,
  problemIds: number[]
) {
  const insertContest = await pool.query(
    "insert into contest (user_id, time_limit_mins) values (?,?)",
    [userId, timeLimit]
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
  return null;
}

export async function checkContestAvailability(roomId: string) {
  const results = await pool.query(
    "select id AS contest_id from contest where id = ?",
    [roomId]
  );

  const contests = z.array(ContestIdSchema).parse(results[0]);
  return contests[0]?.contest_id;
}

export async function insertPlayerIntoContest(contestId: number, name: string) {
  const insertContest = await pool.query(
    "insert into contest_player (contest_id, name) values (?,?)",
    [contestId, name]
  );
  if (Array.isArray(insertContest) && instanceOfSetHeader(insertContest[0])) {
    return insertContest[0].insertId;
  }
  return null;
}

const ContestIdSchema = z.object({
  contest_id: z.number(),
});
