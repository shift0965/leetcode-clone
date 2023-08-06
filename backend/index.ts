import express, { Express } from "express";
import workspaceRouter from "./routes/workspace.route.js";
import problemRouter from "./routes/problem.route.js";
import contestRouter from "./routes/contest.route.js";
import userRouter from "./routes/user.route.js";
import path from "path";

import cors from "cors";
import { errorHandler } from "./helpers/errorHandler.js";
import { rateLimit } from "./middleware/rateLimit.js";
import "dotenv/config.js";

import * as Sentry from "@sentry/node";

const app: Express = express();
const port = process.env.PORT;
const REQUEST_PER_SEC = Number(process.env.REQUEST_PER_SEC) || 100;

//Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

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

app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
