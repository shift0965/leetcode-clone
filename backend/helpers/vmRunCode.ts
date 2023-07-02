import { VM } from "vm2";
import { ExecutionError } from "./errorHandler.js";
import util from "util";

export function verifyExampleCases(
  exampleCases: inputCases[],
  code: string,
  functionName: string
) {
  return exampleCases.map((exampleCase) => {
    const inputs = exampleCase.input;
    const { result, consoles } = runJavaScript(
      inputs,
      true,
      functionName,
      code
    );
    const equality = checkEquality(result, JSON.stringify(exampleCase.output));
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
  functionName: string
) {
  for (let testCase of testCases) {
    const inputs = testCase.input;
    const { result, consoles } = runJavaScript(
      inputs,
      false,
      functionName,
      code
    );
    const equality = checkEquality(result, JSON.stringify(testCase.output));
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

function formatConsoleLog(data: any) {
  if (typeof data === "string") {
    return data;
  } else if (typeof data === "object") {
    return util.inspect(data);
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

function checkEquality(input1: any, input2: any) {
  return input1 === input2;
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
        INPUT_VARIABLES: inputs,
      },
    });

    let result = vm.run(`${code}
      ${functionName}(...INPUT_VARIABLES)
      `);

    return {
      result: isCyclic(result) ? util.inspect(result) : JSON.stringify(result),
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
      //get error line
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
