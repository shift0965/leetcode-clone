import { ResultSetHeader } from "mysql2";
import { z } from "zod";
import pool from "./databasePool.js";

function instanceOfSetHeader(object: any): object is ResultSetHeader {
  return "insertId" in object;
}

export async function createUser(
  email: string,
  name: string,
  picture: string = ""
) {
  const results = await pool.query(
    `
    INSERT INTO user (email, name, picture)
    VALUES(?, ?, ?)
  `,
    [email, name, picture]
  );
  if (Array.isArray(results) && instanceOfSetHeader(results[0])) {
    return results[0].insertId;
  }
  throw new Error("create user failed");
}

const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  picture: z.string().nullish(),
});

export async function findUser(email: string) {
  const results = await pool.query(
    `
    SELECT * FROM user
    WHERE email = ?
  `,
    [email]
  );
  const users = z.array(UserSchema).parse(results[0]);
  return users[0];
}

export async function findUserById(id: string) {
  const results = await pool.query(
    `
    SELECT * FROM user
    WHERE id = ?
  `,
    [id]
  );
  const users = z.array(UserSchema).parse(results[0]);
  return users[0];
}
