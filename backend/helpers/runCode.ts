import { execFile } from "child_process";
import { ExecutionError } from "./errorHandler.js";

function checkEquality(input1: any, input2: any) {
  // Check if the types of input1 and input2 are the same
  if (typeof input1 !== typeof input2) {
    return false;
  }

  // Check if the values of input1 and input2 are the same
  if (typeof input1 === "object") {
    // For arrays and objects, use deep equality comparison
    return JSON.stringify(input1) === JSON.stringify(input2);
  } else {
    // For numbers and strings, use strict equality comparison
    return input1 === input2;
  }
}

function runJavaScript(
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

export function verifyExampleCases(
  exampleCases: inputCases[],
  filePath: string
) {
  return Promise.all(
    exampleCases.map(async (exampleCase) => {
      const args = exampleCase.input;
      const { output, consoles } = await new Promise<ExampleCasesStdoutPromise>(
        (resolve, reject) => {
          runJavaScript(filePath, args, resolve, reject);
        }
      );
      const equality = checkEquality(output, exampleCase.output);
      return {
        passed: equality,
        stdout: consoles,
        output: output,
        expected: exampleCase.output,
      };
    })
  );
}

export async function verifyTestCases(
  testCases: inputCases[],
  filePath: string
) {
  for (let testCase of testCases) {
    const args = testCase.input;
    const { output } = await new Promise<TestCasesData>((resolve, reject) => {
      runJavaScript(filePath, args, resolve, reject);
    });
    const equality = checkEquality(output, testCase.output);
    if (!equality) {
      return {
        passed: false,
        input: args,
        output: output,
        expected: testCase.output,
      };
    }
  }
  return {
    passed: true,
  };
}

type inputCases = {
  input: any;
  output: any;
};

type ExampleCasesStdoutPromise = {
  output: any;
  consoles: any;
};

type TestCasesData = {
  output: any;
};
