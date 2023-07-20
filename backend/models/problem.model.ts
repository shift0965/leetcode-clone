import pool from "./databasePool.js";
import { z } from "zod";

export async function getTestCasesByProblemIdAndType(
  problemId: number,
  type: string
) {
  const results =
    type === "example"
      ? await pool.query(
          "SELECT p.function_name, p.verify_variable, pt.input, pt.output FROM problem AS p LEFT JOIN problem_testcase AS pt ON p.id = pt.problem_id WHERE problem_id = ? ORDER BY pt.id",
          [problemId]
        )
      : await pool.query(
          "SELECT p.function_name, p.verify_variable, pe.input, pe.output FROM problem AS p LEFT JOIN problem_example AS pe ON p.id = pe.problem_id WHERE problem_id = ? ORDER BY pe.id;",
          [problemId]
        );

  const testCasesData = z.array(TestCasesDataSchema).parse(results[0]);
  if (testCasesData.length === 0) return null;

  const runTestCasesData = {
    functionName: testCasesData[0].function_name,
    verifyVariable: testCasesData[0].verify_variable,
    testCases: testCasesData.map((testCase) => {
      return {
        input: JSON.parse(testCase.input),
        output: JSON.parse(testCase.output),
      };
    }),
  };
  return runTestCasesData;
}

export async function getAllProblems() {
  const results = await pool.query(
    "SELECT p.id, p.title, p.difficulty, p.solution_video, t.id AS tag_id, t.title AS tag FROM problem AS p LEFT JOIN problem_to_tag AS pt ON p.id = pt.problem_id LEFT JOIN tag AS t ON t.id = pt.tag_id"
  );
  const problems = z.array(ProblemSchema).parse(results[0]);
  const problemMap = new Map();
  problems.forEach((problem) => {
    const problemObj = problemMap.get(problem.id) || {
      id: problem.id,
      title: problem.title,
      difficulty: problem.difficulty,
      solutionVideo: problem.solution_video,
      tags: [],
    };
    problemObj.tags.push({ id: problem.tag_id, title: problem.tag });
    problemMap.set(problem.id, problemObj);
  });

  return Array.from(problemMap.values());
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

//run test cases
const TestCasesDataSchema = z.object({
  function_name: z.string(),
  verify_variable: z.string().nullable(),
  input: z.string(),
  output: z.string(),
});
