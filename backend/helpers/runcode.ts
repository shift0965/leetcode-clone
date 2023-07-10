import { redisSub, redisClient } from "../models/redis.model.js";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();

const WORKER_QUEUE_LENGTH_LIMIT =
  Number(process.env.WORKER_QUEUE_LENGTH_LIMIT) || 100;

export function runCodeByWorker(
  runExample: boolean,
  cases: ExampleCases[],
  code: string,
  functionName: string,
  verifyVariable: string | null
): Promise<{ type: string; data: any }> {
  const id = randomUUID();

  return new Promise(async (resolve, reject) => {
    try {
      const count = await redisClient.llen("ps-runCode");
      if (count >= WORKER_QUEUE_LENGTH_LIMIT)
        reject(new Error("Server busy. Please try again later."));

      redisClient.lpush(
        "ps-runCode",
        JSON.stringify({
          id: id,
          runExample,
          cases,
          code,
          functionName,
          verifyVariable,
        })
      );

      const resultChannel = `ps-runCodeResult-${id}`;
      redisSub.subscribe(resultChannel);
      const messageHandler = (channel: string, message: string) => {
        if (channel === resultChannel) {
          const result = JSON.parse(message);
          if (result.error) {
            reject(new Error("Worker Error"));
          } else {
            // Send the result back
            resolve({ type: result.type, data: result.data });
          }

          // Unsubscribe and remove the event listener
          redisSub.unsubscribe(resultChannel);
          redisSub.removeListener("message", messageHandler);
        }
      };
      redisSub.on("message", messageHandler);
    } catch (err) {
      reject(err);
    }
  });
}

interface ExampleCases {
  input: any;
  output: any;
}
