import { Redis } from "ioredis";
import { execFile } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export async function runWorker() {
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

  // while (true) {
  //   if (runningProcess >= MAX_CONCURRENT_PROCESSES) {
  //     await waitms(300);
  //     continue;
  //   }
  //   const runCodeRequest = await redisClient.rpop("ps-runCode");
  //   if (runCodeRequest === null) {
  //     await waitms(1000);
  //     continue;
  //   }
  //   const { id, runExample, cases, code, functionName, verifyVariable } =
  //     JSON.parse(runCodeRequest);
  //   runningProcess++;
  //   const childProcess = execFile(
  //     "bun",
  //     [
  //       path.join(__dirname, "workerFile.ts"),
  //       JSON.stringify({
  //         runExample: runExample,
  //         inputCases: cases,
  //         code: code,
  //         functionName: functionName,
  //         verifyVariable: verifyVariable,
  //       }),
  //     ],
  //     { timeout: 1500 },
  //     async (error, stdout, stderr) => {
  //       if (error) {
  //         // console.error(`error: ${error}`);
  //         await redisClient.publish(
  //           `ps-runCodeResult-${id}`,
  //           JSON.stringify({
  //             type: "error",
  //             data: {
  //               name: "Runtime Error",
  //               message: "Time Limit Exceeded",
  //               line: undefined,
  //             },
  //           })
  //         );
  //       } else {
  //         await redisClient.publish(`ps-runCodeResult-${id}`, stdout);
  //       }
  //       runningProcess--;
  //       childProcess.kill();
  //     }
  //   );
  // }
  const interval = setInterval(async () => {
    if (runningProcess >= MAX_CONCURRENT_PROCESSES) {
      await waitms(200);
      return;
    }

    const runCodeRequest = await redisClient.rpop("ps-runCode");
    if (runCodeRequest === null) {
      await waitms(1000);
      return;
    }

    const { id, runExample, cases, code, functionName, verifyVariable } =
      JSON.parse(runCodeRequest);
    runningProcess++;
    const childProcess = execFile(
      "bun",
      [
        path.join(__dirname, "workerFile.ts"),
        JSON.stringify({
          runExample: runExample,
          inputCases: cases,
          code: code,
          functionName: functionName,
          verifyVariable: verifyVariable,
        }),
      ],
      { timeout: 1500 },
      async (error, stdout, stderr) => {
        if (error) {
          // console.error(`error: ${error}`);
          await redisClient.publish(
            `ps-runCodeResult-${id}`,
            JSON.stringify({
              type: "error",
              data: {
                name: "Runtime Error",
                message: "Time Limit Exceeded",
                line: undefined,
              },
            })
          );
        } else {
          await redisClient.publish(`ps-runCodeResult-${id}`, stdout);
        }
        runningProcess--;
        childProcess.kill();
      }
    );
  }, 100);

  return clearInterval(interval);
}
