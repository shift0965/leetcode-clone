import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "./databasePool.js";
import { z } from "zod";

export async function createUser(
  public_id: string,
) {
  const [rows] = await pool.query<ResultSetHeader>(
    `
    INSERT INTO guest_user (public_id)
    VALUES(?)
  `,
    [public_id]
  );
  if (rows.affectedRows != 1) {
    throw new Error("create user failed");
  }
}

const UserRow = z.object({
  id: z.number(),
});
type UserRow = z.infer<typeof UserRow>;

export async function findUser(public_id: string): Promise<UserRow> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT id
    FROM guest_user
    WHERE public_id = ?
    `,
    [public_id]
  );

  const users = z.array(UserRow).parse(rows);
  if (users.length === 0) {
    throw new Error("User not found");
  }
  return users[0];
}