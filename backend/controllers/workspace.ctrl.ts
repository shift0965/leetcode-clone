import { Request, Response, NextFunction } from "express";
import {
  getExampleCasesDataById,
  getTestCasesByProblemId,
} from "../models/problem.model.js";
import { validationResult } from "express-validator";
import { runCodeByWorker } from "../helpers/runcode.js";

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
  const { functionName, exampleCases, verifyVariable } = exampleCasesData;
  try {
    const result = await runCodeByWorker(
      true,
      exampleCases,
      code,
      functionName,
      verifyVariable
    );
    res.send(result);
  } catch (err) {
    next(err);
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
  const { functionName, testCases, verifyVariable } = testCasesData;

  try {
    const result = await runCodeByWorker(
      false,
      testCases,
      code,
      functionName,
      verifyVariable
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
}
