import jwt from "jsonwebtoken";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const JWT_KEY = process.env.JWT_KEY || "";
export const EXPIRE_TIME = 60 * 60 * 24 * 30;

interface userPayload {
  userPublicId: string
}

export function signJWT(userPublicId: string) {
  return new Promise((resolve, reject) => {
    const payload: userPayload = {userPublicId: userPublicId};
    jwt.sign(
      payload,
      JWT_KEY,
      { expiresIn: EXPIRE_TIME },
      function (err, token) {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
}

const UserPayloadSchema = z.object({
  userPublicId: z.string(),
});

export function verifyJWT(token: string): Promise<userPayload> {
  console.log(JWT_KEY)
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_KEY, (err, decoded) => {
      if (err) return reject(err);
      try {
        console.log(decoded)
        const payload = UserPayloadSchema.parse(decoded);
        resolve(payload);
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}
