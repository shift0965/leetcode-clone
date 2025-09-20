import { nanoid } from "nanoid";
import { Request, Response } from "express";
import * as userModel from "../models/user.model.js";
import { signJWT } from "../helpers/jwt.js";
import jwt from "jsonwebtoken";
import { UserPayload, UserPayloadSchema } from "../helpers/jwt.js";

import dotenv from "dotenv";
dotenv.config();

const JWT_KEY = process.env.JWT_KEY || "secret";

export async function createUser(req: Request, res: Response) {
  try {
    const userPublicId = nanoid(32);
    await userModel.createUser(userPublicId);
    const token = await signJWT(userPublicId);
    res
      .status(200)
      .json({
        userToken: token,
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ errors: err.message });
      return;
    }
  }
}

export function verifyJWTWithZod(token: string): UserPayload {
  const decoded = jwt.verify(token, JWT_KEY);
  return UserPayloadSchema.parse(decoded);
}

export async function updateAuthToken(req: Request, res: Response) {
  try {
    const oldToken = req.body.userToken;
    const payload = verifyJWTWithZod(oldToken)
    const userPublicId = payload.userPublicId;
    const token = await signJWT(userPublicId);
    res
      .status(200)
      .json({
        userToken: token,
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ errors: err.message });
      return;
    }
  }
}