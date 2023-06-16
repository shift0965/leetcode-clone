import pool from "./databasePool.js";
import { z } from "zod";

export async function getTestCasesByProblemId(problem_id: number) {
  const test_case = [
    {
      input: [[1, 2, 3, 4, 5, 6, 7], 9],
      output: [1, 6],
    },
    {
      input: [[1, 2, 3, 4, 5], 5],
      output: [0, 3],
    },
    {
      input: [[3, 2, 7, 6, 5, 3, 2, 7, 12, 15, 1], 14],
      output: [1, 8],
    },
  ];
  return test_case;
}

export async function getExampleCasesDataById(problemId: number) {
  const results = await pool.query(
    "SELECT p.function_name, pe.input, pe.output FROM problem AS p LEFT JOIN problem_example AS pe ON p.id = pe.problem_id WHERE problem_id = ?",
    [problemId]
  );
  const ExampleCasesData = z.array(ExampleCasesDataSchema).parse(results[0]);
  if (ExampleCasesData.length === 0) return null;

  const runExampleDataParsed = {
    functionName: ExampleCasesData[0]?.function_name,
    exampleCases: ExampleCasesData.map((exampleCase) => {
      return {
        input: JSON.parse(exampleCase.input),
        output: JSON.parse(exampleCase.output),
      };
    }),
  };

  return runExampleDataParsed;
}

export async function getAllProblems() {
  const results = await pool.query("SELECT id, title, difficulty FROM problem");
  const problems = z.array(ProblemSchema).parse(results[0]);
  return problems;
}

export async function getProblemDetailsById(problemId: number) {
  const results = await pool.query(
    "SELECT p.id, p.title, p.difficulty, p.constraints, p.input_keys, p.boilerplate, pe.input, pe.output, pe.explanation, pe.image FROM problem AS p LEFT JOIN problem_example AS pe ON p.id = pe.problem_id WHERE p.id = ?",
    [problemId]
  );
  const problemDetails = z.array(ProblemDetailsSchema).parse(results[0]);
  if (problemDetails.length === 0) return null;

  const problem = {
    id: problemDetails[0]?.id,
    title: problemDetails[0]?.title,
    difficulty: problemDetails[0]?.difficulty,
    constraints: JSON.parse(problemDetails[0]?.constraints || "{}"),
    input_keys: JSON.parse(problemDetails[0]?.input_keys || "{}"),
    boilerplate: problemDetails[0]?.boilerplate,
    exampleCases: problemDetails.map((item) => {
      return {
        input: JSON.parse(item.input),
        output: JSON.parse(item.output),
        explanation: item.explanation,
        image: item.image,
      };
    }),
  };
  return problem;
}

//schema
const DifficultySchema = z.enum(["Easy", "Medium", "Hard"]);
const ProblemSchema = z.object({
  id: z.number(),
  title: z.string(),
  difficulty: DifficultySchema,
});

const ProblemDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  difficulty: DifficultySchema,
  constraints: z.string().nullable(),
  input_keys: z.string(),
  boilerplate: z.string(),
  input: z.string(),
  output: z.string(),
  explanation: z.string().optional().nullable(),
  image: z.string().nullable(),
});

const ExampleCasesDataSchema = z.object({
  function_name: z.string(),
  input: z.string(),
  output: z.string(),
});
