import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function handleResult(req: Request, res: Response, next: NextFunction) {
  const validResult = validationResult(req);
  if (!validResult.isEmpty()) {
    return res.status(400).send({
      errors: "Invalid value",
      details: validResult.array(),
    });
  }
  next();
}
