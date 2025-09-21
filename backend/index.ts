import express, { Express } from "express";
import workspaceRouter from "./routes/workspace.route.js";
import problemRouter from "./routes/problem.route.js";
import contestRouter from "./routes/contest.route.js";
import userRouter from "./routes/user.route.js";
import path from "path";

import cors from "cors";
import { errorHandler } from "./helpers/errorHandler.js";
import { rateLimit } from "./middleware/rateLimit.js";

const app: Express = express();
const port = 3000;
const REQUEST_PER_SEC = 100;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/1.0", rateLimit(REQUEST_PER_SEC), [
  workspaceRouter,
  problemRouter,
  contestRouter,
  userRouter,
]);

app.use(
  "/",
  rateLimit(REQUEST_PER_SEC),
  express.static(path.resolve("../frontend/dist"))
);
app.get("*", rateLimit(REQUEST_PER_SEC), (req, res) => {
  res.sendFile(path.resolve("../frontend/dist/index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at port ${port}`);
});
