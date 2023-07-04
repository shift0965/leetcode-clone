import express, { Express } from "express";
import workspaceRouter from "./routes/workspace.route.js";
import problemRouter from "./routes/problem.route.js";
import contestRouter from "./routes/contest.route.js";
import userRouter from "./routes/user.route.js";
import path from "path";

import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./helpers/errorHandler.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/1.0", [
  workspaceRouter,
  problemRouter,
  contestRouter,
  userRouter,
]);

app.use("/", express.static(path.resolve("../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve("../frontend/dist/index.html"));
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
