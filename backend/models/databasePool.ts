import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "password",
  database: "leetclone"
});

export default pool;
