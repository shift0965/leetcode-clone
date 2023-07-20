import { z } from "zod";
import * as argon2 from "argon2";
import pool from "./databasePool.js";

export const PROVIDER = {
  NATIVE: "native",
  FACEBOOK: "facebook",
  GOOGLE: "google",
};

export async function createNativeProvider(userId: number, password: string) {
  const token = await argon2.hash(password);
  await pool.query(
    `
    INSERT INTO user_provider (user_id, name, token)
    VALUES(?, ?, ?)
  `,
    [userId, PROVIDER.NATIVE, token]
  );
}

const ProviderSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  name: z.enum(["native", "facebook", "google"]),
  token: z.string(),
});

export async function checkNativeProviderToken(
  userId: number,
  password: string
) {
  const results = await pool.query(
    `
    SELECT * FROM user_provider
    WHERE user_id = ? AND name = "native"
  `,
    [userId]
  );

  const providers = z.array(ProviderSchema).parse(results[0]);
  if (providers.length !== 1) {
    throw new Error("Native provider length wrong");
  }
  return argon2.verify(providers[0].token, password);
}
