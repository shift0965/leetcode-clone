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
  const results = await pool.query(
    "SELECT p.id, p.title, p.difficulty, p.solution_video, t.id AS tag_id, t.title AS tag FROM problem AS p LEFT JOIN problem_to_tag AS pt ON p.id = pt.problem_id LEFT JOIN tag AS t ON t.id = pt.tag_id"
  );
  console.log(results[0]);
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
    "SELECT p.id, p.title, p.description, p.difficulty, p.constraints, p.input_keys, p.boilerplate FROM problem AS p WHERE p.id = (?)",
    [problemId]
  );

  const exampleCaseResults = await pool.query(
    "SELECT pe.input, pe.output, pe.explanation, pe.image FROM problem_example AS pe WHERE pe.problem_id = (?)",
    problemId
  );
  const tagResults = await pool.query(
    "SELECT t.id, t.title FROM problem_to_tag AS pt LEFT JOIN tag AS t on t.id = pt.tag_id WHERE pt.problem_id = (?)",
    [problemId]
  );

  const problemDetails = z.array(ProblemDetailsSchema).parse(problemResults[0]);
  const exampleCases = z
    .array(ProblemDetailsExampleCasesSchema)
    .parse(exampleCaseResults[0]);
  const tags = z.array(TagSchema).parse(tagResults[0]);

  if (problemDetails.length === 0) return null;

  const problem = {
    id: problemDetails[0].id,
    title: problemDetails[0].title,
    difficulty: problemDetails[0].difficulty,
    description: problemDetails[0].description,
    constraints: JSON.parse(problemDetails[0].constraints || "{}"),
    input_keys: JSON.parse(problemDetails[0].input_keys || "{}"),
    boilerplate: problemDetails[0].boilerplate,
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
