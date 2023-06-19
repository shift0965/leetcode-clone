import { NextFunction, Request, Response } from "express";

export class ExecutionError extends Error {
  line: number | undefined;
  constructor(name: string, message: string, line: number | undefined) {
    super(message);
    this.message = message;
    this.line = line;
    this.name = name;
  }
}

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
  if (err instanceof ExecutionError) {
    return res
      .status(400)
      .json({ name: err.name, line: err.line, message: err.message });
  }

  if (err instanceof ValidationError) {
    return res.status(401).json(err);
  }
  if (err instanceof Error) {
    return res.status(500).json({ errors: err.message });
  }
  res.status(500).send("Oops, unknown error");
  return;
}
