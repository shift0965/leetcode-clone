import { execFile } from "child_process";
import { ExecutionError } from "./errorHandler.js";

export function runJavaScript(
  filePath: string,
  args: any[],
  resolve: (value: { output: any; consoles: any }) => void,
  reject: (value: any) => void
) {
  execFile(
    "node",
    [filePath, JSON.stringify(args)],
    { timeout: 1000 },
    (error: any, stdout: any, stderr: any) => {
      if (error) {
        if (error.signal === "SIGTERM") {
          return reject(
            new ExecutionError(
              "Runtime Error",
              "Time Limit Exceeded",
              undefined
            )
          );
        }

        let split = error.toString().split("\n");
        //get error line
        const line = split[1].split(":")[split[1].split(":").length - 1];
        const message = split[5];
        return reject(new ExecutionError("Execution Error", message, line));
      }
      //console.log("Output:", stdout);
      //console.error("STD Error:", stderr);
      return resolve(JSON.parse(stdout));
    }
  );
}
