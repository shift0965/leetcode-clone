import { Request, Response, NextFunction } from "express";
import { generateFile, removeFile } from "../helpers/filesHelper.js";
import { runExampleCasesJs } from "../helpers/runCode.js";
import {
  getExampleCasesDataById,
  getTestCasesByProblemId,
} from "../models/problem.model.js";
import { validationResult } from "express-validator";

function checkEquality(input1: any, input2: any) {
  // Check if the types of input1 and input2 are the same
  if (typeof input1 !== typeof input2) {
    return false;
  }

  // Check if the values of input1 and input2 are the same
  if (typeof input1 === "object") {
    // For arrays and objects, use deep equality comparison
    return JSON.stringify(input1) === JSON.stringify(input2);
  } else {
    // For numbers and strings, use strict equality comparison
    return input1 === input2;
  }
}

export async function runExampleCases(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validResult = validationResult(req);
  if (!validResult.isEmpty()) {
    return res.status(400).send({ errors: validResult.array() });
  }
  const { problemId, language, code } = req.body;
  const exampleCasesData = await getExampleCasesDataById(problemId);
  if (exampleCasesData === null)
    return res.status(400).send({ errors: "Problem not found" });
  const { functionName, exampleCases } = exampleCasesData;

  const ifRecordConsole = true;
  const filePath = await generateFile(
    language,
    code,
    functionName,
    ifRecordConsole
  );

  try {
    const results = await Promise.all(
      exampleCases.map(async (exampleCase) => {
        const args = exampleCase.input;
        const { output, consoles } =
          await new Promise<ExampleCasesStdoutPromise>((resolve, reject) => {
            runExampleCasesJs(filePath, args, resolve, reject);
          });
        const equality = checkEquality(output, exampleCase.output);
        return {
          passed: equality,
          stdout: consoles,
          output: output,
          expected: exampleCase.output,
        };
      })
    );

    return res.status(200).send(results);
  } catch (err) {
    next(err);
  } finally {
    await removeFile(filePath);
  }
}

export async function runTestCases(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validResult = validationResult(req);
  if (!validResult.isEmpty()) {
    return res.status(400).send({ errors: validResult.array() });
  }
  const { problemId, language, code } = req.body;
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

  try {
    for (let testCase of testCases) {
      const args = testCase.input;
      const { output } = await new Promise<TestCasesDataSchema>(
        (resolve, reject) => {
          runExampleCasesJs(filePath, args, resolve, reject);
        }
      );
      const equality = checkEquality(output, testCase.output);
      if (!equality) {
        return res.status(200).send({
          passed: false,
          input: args,
          output: output,
          expected: testCase.output,
        });
      }
    }
    return res.status(200).send({
      passed: true,
    });
  } catch (err) {
    next(err);
  } finally {
    await removeFile(filePath);
  }
}

type ExampleCasesStdoutPromise = {
  output: any;
  consoles: any;
};

type TestCasesDataSchema = {
  output: any;
};
