import { NextFunction, Request, Response } from "express";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "Validation Error";
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err instanceof ValidationError) {
    return res.status(401).json({ errors: err.message });
  }
  if (err instanceof Error) {
    return res.status(500).json({ errors: err.message });
  }
  return res.status(500).send("Oops, unknown error");
}
