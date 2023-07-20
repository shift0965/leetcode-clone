import { Request, Response } from "express";
import { z } from "zod";
// import axios from "axios";
import * as userModel from "../models/user.model.js";
import * as userProviderModel from "../models/userProvider.model.js";
import signJWT, { EXPIRE_TIME } from "../helpers/signJWT.js";

const FB_APP_ID = process.env.FB_APP_ID;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  //secure: true,
  sameSite: "strict",
} as const;

export async function signUp(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const userId = await userModel.createUser(email, name);
    await userProviderModel.createNativeProvider(userId, password);
    const token = await signJWT(userId);
    res
      .cookie("jwtToken", token, COOKIE_OPTIONS)
      .status(200)
      .json({
        data: {
          access_token: token,
          access_expired: new Date().getTime() / 1000 + EXPIRE_TIME,
          user: {
            id: userId,
            provider: userProviderModel.PROVIDER.NATIVE,
            name,
            email,
            picture: "",
          },
        },
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ errors: err.message });
      return;
    }
    res.status(500).json({ errors: "sign up failed" });
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findUser(email);
    if (!user) {
      throw new Error("user not exist");
    }
    const isValidPassword = await userProviderModel.checkNativeProviderToken(
      user.id,
      password
    );
    if (!isValidPassword) {
      throw new Error("invalid password");
    }
    const token = await signJWT(user.id);
    res
      .cookie("jwtToken", token, COOKIE_OPTIONS)
      .status(200)
      .json({
        data: {
          access_token: token,
          access_expired: new Date().getTime() / 1000 + EXPIRE_TIME,
          user: {
            ...user,
            provider: userProviderModel.PROVIDER.NATIVE,
          },
        },
      });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ errors: err.message });
      return;
    }
    res.status(500).json({ errors: "sign in failed" });
  }
}
