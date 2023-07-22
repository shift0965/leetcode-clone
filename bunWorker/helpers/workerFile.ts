import { verifyCases } from "./workerFunctions";
import { inputCases } from "./const";

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
