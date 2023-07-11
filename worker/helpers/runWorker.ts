import { Redis } from "ioredis";
import { execFile } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});
const waitOneSecond = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

const MAX_CONCURRENT_PROCESSES =
  Number(process.env.MAX_CONCURRENT_PROCESSES) || 4;
let runningProcess = 0;

export async function runWorker() {
  while (true) {
    if (runningProcess >= MAX_CONCURRENT_PROCESSES) {
      await waitOneSecond(300);
      continue;
    }

    const runCodeRequest = await redisClient.rpop("ps-runCode");
    if (runCodeRequest === null) {
      await waitOneSecond(1000);
      continue;
    }

    const { id, runExample, cases, code, functionName, verifyVariable } =
      JSON.parse(runCodeRequest);
    runningProcess++;
    execFile(
      "node",
      [
        path.join(__dirname, "workerFile.js"),
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
          redisClient.publish(
            `ps-runCodeResult-${id}`,
            JSON.stringify({ error: "Worker Error" })
          );
        } else {
          redisClient.publish(`ps-runCodeResult-${id}`, stdout);
        }
        setTimeout(() => {
          runningProcess--;
        }, 100);
      }
    );
  }
}
