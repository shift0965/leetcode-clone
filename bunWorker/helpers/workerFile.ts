import vm from "vm";
import util from "util";

async function verifyCases(
  runExample: boolean,
  inputCases: inputCases[],
  code: string,
  functionName: string,
  verifyVariable: string | null
) {
  try {
    if (runExample) {
      const data = [];
      for (let inputCase of inputCases) {
        const inputs = inputCase.input;
        const { result, consoles } = await runJavaScript(
          inputs,
          true,
          functionName,
          code
        );
        const equality = checkEquality(
          result,
          inputCase.output,
          verifyVariable
        );

        data.push({
          passed: equality,
          stdout: consoles,
          output: result,
          expected: inputCase.output,
        });
      }
      return { type: "example", data: data };
    } else {
      for (let inputCase of inputCases) {
        const inputs = inputCase.input;
        const { result, consoles } = await runJavaScript(
          inputs,
          runExample,
          functionName,
          code
        );
        const equality = checkEquality(
          result,
          inputCase.output,
          verifyVariable
        );

        if (!equality) {
          return {
            type: "test",
            data: {
              passed: false,
              input: inputs,
              output: result,
              expected: inputCase.output,
            },
          };
        }
      }
      return { type: "test", data: { passed: true } };
    }
  } catch (err: any) {
    return {
      type: "error",
      data: { name: err.name, message: err.message, line: err.line },
    };
  }
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

async function runJavaScript(
  inputs: any[],
  ifRecordConsole: boolean,
  functionName: string,
  code: string
): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const consoles: any[] = [];
      const context = vm.createContext({
        console: {
          ...console,
          log: (data: any) => {
            ifRecordConsole && consoles.push(formatConsoleLog(data));
          },
        },
      });
      const result = vm.runInContext(
        `${code}
      const EXECUTE_USER_CODE = (cb) => {
        const EXECUTION_INPUT = ${JSON.stringify(inputs)}
        return cb(...EXECUTION_INPUT)
      }
      EXECUTE_USER_CODE(${functionName})`,
        context
      );
      resolve({
        result: isCyclic(result) ? util.inspect(result) : result,
        consoles,
      });
    } catch (error: any) {
      if (error.name === "ReferenceError") {
        let split = error.stack.split("\n");
        const line = split[1].split(":")[split[1].split(":").length - 2];
        const message = split[0];
        reject(new ExecutionError("Reference Error", message, line));
      } else if (error.name === "SyntaxError") {
        // let split = error.stack.split("\n");
        // const line = split[0].split(":")[split[0].split(":").length - 1];
        // const message = split[4];
        reject(
          new ExecutionError(
            "Syntax Error",
            "Unexpected EOF while executing code",
            undefined
          )
        );
      } else {
        reject(new ExecutionError("Execution Error", error.message, undefined));
      }
    }
  });
}

type inputCases = {
  input: any;
  output: any;
};

class ExecutionError extends Error {
  line: number | undefined;
  constructor(name: string, message: string, line: number | undefined) {
    super(message);
    this.message = message;
    this.line = line;
    this.name = name;
  }
}

const INPUT_ARG: {
  runExample: boolean;
  inputCases: inputCases[];
  code: string;
  functionName: string;
  verifyVariable: string | null;
} = JSON.parse(process.argv[2]);

const result = await verifyCases(
  INPUT_ARG.runExample,
  INPUT_ARG.inputCases,
  INPUT_ARG.code,
  INPUT_ARG.functionName,
  INPUT_ARG.verifyVariable
);
process.stdout.write(JSON.stringify(result));
process.exit(0);
