import { VM } from "vm2";
import util from "util";
async function verifyCases(runExample, inputCases, code, functionName, verifyVariable) {
    try {
        if (runExample) {
            const data = [];
            for (let inputCase of inputCases) {
                const inputs = inputCase.input;
                const { result, consoles } = await runJavaScript(inputs, true, functionName, code);
                const equality = checkEquality(result, inputCase.output, verifyVariable);
                data.push({
                    passed: equality,
                    stdout: consoles,
                    output: result,
                    expected: inputCase.output,
                });
            }
            return { type: "example", data: data };
        }
        else {
            for (let inputCase of inputCases) {
                const inputs = inputCase.input;
                const { result, consoles } = await runJavaScript(inputs, runExample, functionName, code);
                const equality = checkEquality(result, inputCase.output, verifyVariable);
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
    }
    catch (err) {
        return {
            type: "error",
            data: { name: err.name, message: err.message, line: err.line },
        };
    }
}
function formatConsoleLog(data) {
    if (typeof data === "string") {
        return data;
    }
    else if (typeof data === "object") {
        return isCyclic(data) ? util.inspect(data) : JSON.stringify(data);
    }
    else {
        return String(data);
    }
}
function isCyclic(obj) {
    var seenObjects = [];
    function detect(obj) {
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
function checkEquality(result, answer, verifyVariable) {
    if (verifyVariable === "ignore order") {
        try {
            return (JSON.stringify([...result].sort()) === JSON.stringify(answer.sort()));
        }
        catch (err) {
            return false;
        }
    }
    else
        return JSON.stringify(result) === JSON.stringify(answer);
}
async function runJavaScript(inputs, ifRecordConsole, functionName, code) {
    const consoles = [];
    const vm = new VM({
        timeout: 1000,
        allowAsync: false,
        wasm: false,
        sandbox: {
            console: {
                ...console,
                log: (data) => {
                    ifRecordConsole && consoles.push(formatConsoleLog(data));
                },
            },
            //EXECUTION_INPUT: inputs,
        },
    });
    return new Promise(async (resolve, reject) => {
        try {
            let result = vm.run(`${code}
        const EXECUTE_USER_CODE = (cb) => {
          const EXECUTION_INPUT = ${JSON.stringify(inputs)}
          return cb(...EXECUTION_INPUT)
        }
        EXECUTE_USER_CODE(${functionName})`);
            resolve({
                result: isCyclic(result) ? util.inspect(result) : result,
                consoles,
            });
        }
        catch (error) {
            if (error.message === "Script execution timed out after 1000ms") {
                reject(new ExecutionError("Runtime Error", "Time Limit Exceeded", undefined));
            }
            else if (error.name === "ReferenceError") {
                let split = error.stack.split("\n");
                const line = split[1].split(":")[split[1].split(":").length - 2];
                const message = split[0];
                reject(new ExecutionError("Reference Error", message, line));
            }
            else if (error.name === "SyntaxError") {
                let split = error.stack.split("\n");
                const line = split[0].split(":")[split[0].split(":").length - 1];
                const message = split[4];
                reject(new ExecutionError("Syntax Error", message, line));
            }
            else {
                reject(new ExecutionError("Execution Error", error.message, undefined));
            }
        }
    });
}
class ExecutionError extends Error {
    line;
    constructor(name, message, line) {
        super(message);
        this.message = message;
        this.line = line;
        this.name = name;
    }
}
const INPUT_ARG = JSON.parse(process.argv[2]);
process.stdout.write(JSON.stringify(await verifyCases(INPUT_ARG.runExample, INPUT_ARG.inputCases, INPUT_ARG.code, INPUT_ARG.functionName, INPUT_ARG.verifyVariable)));
