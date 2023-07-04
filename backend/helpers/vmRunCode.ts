import { VM } from "vm2";
import { ExecutionError } from "./errorHandler.js";
import util from "util";

export function verifyExampleCases(
  exampleCases: inputCases[],
  code: string,
  functionName: string,
  verifyVariable: string | null
) {
  return exampleCases.map((exampleCase) => {
    const inputs = exampleCase.input;
    const { result, consoles } = runJavaScript(
      inputs,
      true,
      functionName,
      code
    );
    const equality = checkEquality(result, exampleCase.output, verifyVariable);
    return {
      passed: equality,
      stdout: consoles,
      output: result,
      expected: exampleCase.output,
    };
  });
}

export function verifyTestCases(
  testCases: inputCases[],
  code: string,
  functionName: string,
  verifyVariable: string | null
) {
  for (let testCase of testCases) {
    const inputs = testCase.input;
    const { result, consoles } = runJavaScript(
      inputs,
      false,
      functionName,
      code
    );
    const equality = checkEquality(result, testCase.output, verifyVariable);
    if (!equality) {
      return {
        passed: equality,
        input: inputs,
        output: result,
        expected: testCase.output,
      };
    }
  }
  return {
    passed: true,
  };
}

function formatConsoleLog(data: any) {
  if (typeof data === "string") {
    return data;
  } else if (typeof data === "object") {
    return isCyclic(data) ? util.inspect(data) : JSON.stringify(data);
  } else {
    return String(data);
  }
}

function isCyclic(obj: any) {
  var seenObjects: any[] = [];

  function detect(obj: any) {
    if (obj && typeof obj === "object") {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}

function checkEquality(
  result: any,
  answer: any,
  verifyVariable: string | null
) {
  if (verifyVariable === "ignore order") {
    try {
      return (
        JSON.stringify([...result].sort()) === JSON.stringify(answer.sort())
      );
    } catch (err) {
      return false;
    }
  } else return JSON.stringify(result) === JSON.stringify(answer);
}

function runJavaScript(
  inputs: any[],
  ifRecordConsole: boolean,
  functionName: string,
  code: string
) {
  try {
    const consoles: any[] = [];
    const vm = new VM({
      timeout: 1000,
      allowAsync: false,
      wasm: false,
      sandbox: {
        console: {
          ...console,
          log: (data: any) => {
            ifRecordConsole && consoles.push(formatConsoleLog(data));
          },
        },
        //EXECUTION_INPUT: inputs,
      },
    });
    let result = vm.run(`${code}
    const EXECUTE_USER_CODE = (cb) => {
      const EXECUTION_INPUT = ${JSON.stringify(inputs)}
      return cb(...EXECUTION_INPUT)
    }
    EXECUTE_USER_CODE(${functionName})`);
    return {
      result: isCyclic(result) ? util.inspect(result) : result,
      consoles,
    };
  } catch (error) {
    if (error.message === "Script execution timed out after 1000ms") {
      throw new ExecutionError(
        "Runtime Error",
        "Time Limit Exceeded",
        undefined
      );
    } else if (error.name === "ReferenceError") {
      let split = error.stack.split("\n");
      const line = split[1].split(":")[split[1].split(":").length - 2];
      const message = split[0];
      throw new ExecutionError("Reference Error", message, line);
    } else if (error.name === "SyntaxError") {
      let split = error.stack.split("\n");
      const line = split[0].split(":")[split[0].split(":").length - 1];
      const message = split[4];
      throw new ExecutionError("Syntax Error", message, line);
    } else {
      throw new ExecutionError("Execution Error", error.message, undefined);
    }
  }
}

type inputCases = {
  input: any;
  output: any;
};
