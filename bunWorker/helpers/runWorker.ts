import { Redis } from "ioredis";
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
const waitms = async (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
};

const MAX_CONCURRENT_PROCESSES =
  Number(process.env.MAX_CONCURRENT_PROCESSES) || 8;
let runningProcess = 0;

export async function runWorker() {
  while (true) {
    if (runningProcess >= MAX_CONCURRENT_PROCESSES) {
      await waitms(300);
      continue;
    }
    const runCodeRequest = await redisClient.rpop("ps-runCode");
    if (runCodeRequest === null) {
      await waitms(1000);
      continue;
    }
    const { id, runExample, cases, code, functionName, verifyVariable } =
      JSON.parse(runCodeRequest);
    runningProcess++;

    new Promise(async (resolve, reject) => {
      const proc = Bun.spawn([
        "bun",
        path.join(__dirname, "workerFile.ts"),
        JSON.stringify({
          runExample: runExample,
          inputCases: cases,
          code: code,
          functionName: functionName,
          verifyVariable: verifyVariable,
        }),
      ]);
      const result = await Promise.race<string>([
        new Response(proc.stdout).text(),
        new Promise((resolve) => {
          setTimeout(
            () =>
              resolve(
                JSON.stringify({
                  type: "error",
                  data: {
                    name: "Runtime Error",
                    message: "Time Limit Exceeded",
                    line: undefined,
                  },
                })
              ),
            1000
          );
        }),
      ]);
      proc.kill();
      if (result.length > 300000) {
        redisClient.publish(
          `ps-runCodeResult-${id}`,
          JSON.stringify({
            type: "error",
            data: {
              name: "Output Limit Exceeded",
              message: "The size of output data is too large",
              line: undefined,
            },
          })
        );
      }
      redisClient.publish(`ps-runCodeResult-${id}`, result);
      runningProcess--;
      resolve(true);
    });
  }
}
