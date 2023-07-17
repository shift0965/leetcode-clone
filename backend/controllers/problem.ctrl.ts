import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import {
  getAllProblems,
  getProblemDetailsById,
} from "../models/problem.model.js";

export async function getProblems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const problems = await getAllProblems();
    res.send(problems);
  } catch (err) {
    next(err);
  }
}

export async function getProblemDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const problemId = Number(req.query.id);
    const problemDetails = await getProblemDetailsById(problemId);
    if (problemDetails === null)
      return res.status(404).send({ errors: "Problem not found" });
    res.send(problemDetails);
  } catch (err) {
    next(err);
  }
}
