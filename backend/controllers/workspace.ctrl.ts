import { Request, Response, NextFunction } from "express";
import { getTestCasesByProblemIdAndType } from "../models/problem.model.js";
import { runCodeByWorker } from "../helpers/runcode.js";

export async function runCodeCases(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { problemId, language, code } = req.body;
  const type = <"example" | "hidden">req.params.type;
  const testCaseData = await getTestCasesByProblemIdAndType(problemId, type);

  if (!testCaseData)
    return res.status(400).send({ errors: "Problem not found" });
  const { functionName, testCases, verifyVariable } = testCaseData;

  try {
    if (language === "js") {
      const result = await runCodeByWorker(
        type === "example",
        testCases,
        code,
        functionName,
        verifyVariable
      );
      res.send(result);
    } else {
      return res.status(400).send({ errors: "Language not found" });
    }
  } catch (err) {
    next(err);
  }
}
