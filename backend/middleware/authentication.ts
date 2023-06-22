import { Request, Response, NextFunction } from "express";
import verifyJWT from "../helpers/verifyJWT.js";

async function authentication(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenInHeaders = req.get("Authorization");
    const token =
      tokenInHeaders?.replace("Bearer ", "") || req.cookies.jwtToken;

    if (!token) {
      res.status(401).json({ errors: "invalid token" });
      return;
    }
    const decoded = await verifyJWT(token);
    res.locals.userId = decoded.userId;
    next();
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).json({ errors: err.message });
      return;
    }
    res.status(403).json({ errors: "authenticate failed or expired" });
  }
}

export default authentication;
