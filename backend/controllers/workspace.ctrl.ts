import { Request, Response, NextFunction } from "express";
import {
  getExampleCasesDataById,
  getTestCasesByProblemId,
} from "../models/problem.model.js";
import { validationResult } from "express-validator";
import { verifyExampleCases, verifyTestCases } from "../helpers/vmRunCode.js";

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

  try {
    const results = verifyExampleCases(exampleCases, code, functionName);
    return res.status(200).send(results);
    //res.sendStatus(200);
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
  const { functionName, testCases } = testCasesData;
  try {
    const result = verifyTestCases(testCases, code, functionName);
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}
