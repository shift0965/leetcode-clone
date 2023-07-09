import express, { Request, Response } from "express";
import { execFile } from "child_process";
import dotenv from "dotenv";
import { Redis } from "ioredis";
dotenv.config();

const redisSub = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});
const redisPub = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});

const port = process.env.PORT;
const app = express();
app.use(express.json());

redisSub.subscribe("ps-runCode");
redisSub.on("message", async (channel: string, message: string) => {
  if (channel === "ps-runCode") {
    const { id, runExample, cases, code, functionName, verifyVariable } =
      JSON.parse(message);

    execFile(
      "node",
      [
        "dist/helpers/workerFile.js",
        JSON.stringify({
          runExample: runExample,
          inputCases: cases,
          code: code,
          functionName: functionName,
          verifyVariable: verifyVariable,
        }),
      ],
      (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error}`);
          return;
        }
        redisPub.publish(`ps-runCodeResult-${id}`, stdout);
      }
    );
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
