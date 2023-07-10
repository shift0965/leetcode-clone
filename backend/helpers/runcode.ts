import { any } from "zod";
import { redisSub, redisClient } from "../models/redis.model.js";
import { randomUUID } from "crypto";

export function runCodeByWorker(
  runExample: boolean,
  cases: ExampleCases[],
  code: string,
  functionName: string,
  verifyVariable: string | null
): Promise<{ type: string; data: any }> {
  const id = randomUUID();
  return new Promise((resolve, reject) => {
    try {
      // redisClient.publish(
      //   "ps-runCode",
      //   JSON.stringify({
      //     id: id,
      //     runExample,
      //     cases,
      //     code,
      //     functionName,
      //     verifyVariable,
      //   })
      // );
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
          // Send the result back
          resolve({ type: result.type, data: result.data });

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
