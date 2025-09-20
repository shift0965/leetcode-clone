import jwt from "jsonwebtoken";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const JWT_KEY = process.env.JWT_KEY || "secret";
export const EXPIRE_TIME = 60 * 60 * 24 * 30;

export interface UserPayload {
  userPublicId: string
}

export function signJWT(userPublicId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload: UserPayload = {userPublicId: userPublicId};
    jwt.sign(
      payload,
      JWT_KEY,
      { expiresIn: EXPIRE_TIME },
      function (err, token) {
        if (err) {
          reject(err);
        }
        resolve(token!);
      }
    );
  });
}

export const UserPayloadSchema = z.object({
  userPublicId: z.string(),
});

export function verifyJWT(token: string): Promise<UserPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) return reject(err);
      try {
        const payload = UserPayloadSchema.parse(decoded);
        resolve(payload);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}
