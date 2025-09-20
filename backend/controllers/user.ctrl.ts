import { nanoid } from "nanoid";
import { Request, Response } from "express";
import * as userModel from "../models/user.model.js";
import { signJWT } from "../helpers/jwt.js";

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