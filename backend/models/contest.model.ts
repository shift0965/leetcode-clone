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

export async function getProblemDetailsById(problemId: number) {
  const problemResults = await pool.query(
    "SELECT p.id, p.title, p.description, p.difficulty, p.constraints, p.solution_video, p.input_keys, p.boilerplate FROM problem AS p WHERE p.id = (?)",
    [problemId]
  );

  const exampleCaseResults = await pool.query(
    "SELECT pe.input, pe.output, pe.explanation, pe.image FROM problem_example AS pe WHERE pe.problem_id = (?) ORDER BY pe.id;",
    problemId
  );
  const tagResults = await pool.query(
    "SELECT t.id, t.title FROM problem_to_tag AS pt LEFT JOIN tag AS t on t.id = pt.tag_id WHERE pt.problem_id = (?)",
    [problemId]
  );

  const problemDetail = z
    .array(ProblemDetailsSchema)
    .parse(problemResults[0])[0];
  if (!problemDetail) return null;

  const exampleCases = z
    .array(ProblemDetailsExampleCasesSchema)
    .parse(exampleCaseResults[0]);
  const tags = z.array(TagSchema).parse(tagResults[0]);

  const problem = {
    id: problemDetail.id,
    title: problemDetail.title,
    difficulty: problemDetail.difficulty,
    description: problemDetail.description,
    solutionVideo: problemDetail.solution_video,
    constraints: JSON.parse(problemDetail.constraints || "{}"),
    inputKeys: JSON.parse(problemDetail.input_keys || "{}"),
    boilerplate: problemDetail.boilerplate,
    exampleCases: exampleCases.map((exampleCase) => ({
      input: JSON.parse(exampleCase.input),
      output: JSON.parse(exampleCase.output),
      explanation: exampleCase.explanation,
      image: exampleCase.image,
    })),
    tags: tags,
  };
  return problem;
}

//schema
const DifficultySchema = z.enum(["Easy", "Medium", "Hard"]);
const ProblemSchema = z.object({
  id: z.number(),
  title: z.string(),
  difficulty: DifficultySchema,
  solution_video: z.string().nullable(),
  tag: z.string().nullable(),
  tag_id: z.number().nullable(),
});

//get Problem details
const ProblemDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  difficulty: DifficultySchema,
  description: z.string(),
  constraints: z.string().nullable(),
  solution_video: z.string().nullable(),
  input_keys: z.string(),
  boilerplate: z.string(),
});

const ProblemDetailsExampleCasesSchema = z.object({
  input: z.string(),
  output: z.string(),
  explanation: z.string().optional().nullable(),
  image: z.string().nullable(),
});

const TagSchema = z.object({
  id: z.number(),
  title: z.string(),
});

//run example cases
const ExampleCasesDataSchema = z.object({
  function_name: z.string(),
  input: z.string(),
  output: z.string(),
});

//run test cases
const TestCasesDataSchema = z.object({
  function_name: z.string(),
  input: z.string(),
  output: z.string(),
});
