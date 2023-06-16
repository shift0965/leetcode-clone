import { Request, Response, NextFunction } from "express";
import { generateFile, removeFile } from "../helpers/filesHelper.js";
import { runExampleCasesJs } from "../helpers/runCode.js";
import { getExampleCasesDataById } from "../models/problem.model.js";
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

  const filePath = await generateFile(language, code, functionName);

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
          Passed: equality,
          Stdout: consoles,
          Output: output,
          Expected: exampleCase.output,
        };
      })
    );

    return res.status(200).send(results);
  } catch (err) {
    next(err);
  } finally {
    //await removeFile(filePath);
  }
}

type ExampleCasesStdoutPromise = {
  output: any;
  consoles: any;
};
