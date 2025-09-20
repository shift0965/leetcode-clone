import { Request, Response, NextFunction } from "express";
import { findUser } from "../models/user.model.js";
import { verifyJWT } from "../helpers/jwt.js";

async function authentication(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('start auth')
    console.log('X-Custom-Auth:', req.get('X-Custom-Auth'));
    console.log('Authorization:', req.get('Authorization'));
    const tokenInHeaders = req.get("Authorization");
    const token = tokenInHeaders?.replace("Bearer ", "")
    console.log(token)

    if (!token) {
      res.status(401).json({ errors: "invalid token" });
      return;
    }
    const decoded = await verifyJWT(token);
    const user = await findUser(decoded.userPublicId);
    res.locals.userId = user.id;
    next();
  } catch (err) {
    res.status(403).json({ errors: err.message });
  }
}

export default authentication;
