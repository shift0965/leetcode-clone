import { Request, Response, NextFunction } from "express";
import { generateFile, removeFile } from "../helpers/filesHelper.js";
import {
  getExampleCasesDataById,
  getTestCasesByProblemId,
} from "../models/problem.model.js";
import { validationResult } from "express-validator";
import { verifyExampleCases, verifyTestCases } from "../helpers/runCode.js";

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
    const results = await verifyExampleCases(exampleCases, filePath);
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
    const result = await verifyTestCases(testCases, filePath);
    return res.status(200).send(result);
  } catch (err) {
    next(err);
  } finally {
    await removeFile(filePath);
  }
}
