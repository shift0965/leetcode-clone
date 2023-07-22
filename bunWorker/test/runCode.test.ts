import { expect, test, describe } from "bun:test";
import {
  verifyCases,
  formatConsoleLog,
  isCyclic,
  runJavaScript,
} from "../helpers/workerFunctions";
import { ExecutionError } from "../helpers/const";

describe("FormatConsoleLog", () => {
  test("Should return string 'circular'", () => {
    //Arange
    const obj = { a: { b: {} } };
    obj.a.b = obj;

    //Act
    const result = formatConsoleLog(obj);

    //Assert
    expect(result).toBe(`{ a: { b: [Circular] } }`);
  });

  test("Should turn number into string", () => {
    //Arange
    const num = 2002;

    //Act
    const result = formatConsoleLog(num);

    //Assert
    expect(result).toBe("2002");
  });
});
describe("isCyclic", () => {
  test("Should return true when circular obj came in", () => {
    //Arange
    const obj = { a: { b: {} } };
    obj.a.b = obj;

    //Act
    const result = isCyclic(obj);

    //Assert
    expect(result).toBe(true);
  });

  test("Should have return false when input is not an object", () => {
    //Arange
    const num = 2002;

    //Act
    const result = isCyclic(num);

    //Assert
    expect(result).toBe(false);
  });

  test("Should have return false as input is not a circular object", () => {
    //Arange
    const obj = { a: { b: { c: "hi" } } };

    //Act
    const result = isCyclic(obj);

    //Assert
    expect(result).toBe(false);
  });
});
describe("runjavascript", () => {
  test("Should return result and consoles", async () => {
    //Arange
    const input = MERGE_INTERVAL_CASES[0].input;
    const expectedResult = {
      result: [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
      consoles: ["hi there"],
    };

    //Act
    const result = await runJavaScript(
      input,
      true,
      MERGE_INTERVAL_FUNCTIONNAME,
      MERGE_INTERVAL_SUCCESS_CODE
    );

    //Assert
    expect(result).toMatchObject(expectedResult);
  });
  test("Should return result without consoles", async () => {
    //Arange
    const input = MERGE_INTERVAL_CASES[0].input;
    const expectedResult = {
      result: [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
      consoles: [],
    };

    //Act
    const result = await runJavaScript(
      input,
      false,
      MERGE_INTERVAL_FUNCTIONNAME,
      MERGE_INTERVAL_SUCCESS_CODE
    );

    //Assert
    expect(result).toEqual(expectedResult);
  });
  test("Should throw Syntax Error", async () => {
    //Arange
    const input = MERGE_INTERVAL_CASES[0].input;

    //Act
    try {
      const result = await runJavaScript(
        input,
        false,
        MERGE_INTERVAL_FUNCTIONNAME,
        MERGE_INTERVAL_SYNTAX_ERROR_CODE
      );
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ExecutionError);
      expect(error.name).toBe("Syntax Error");
    }
  });
  test("Should throw Reference Error", async () => {
    //Arange
    const input = MERGE_INTERVAL_CASES[0].input;

    //Act
    try {
      const result = await runJavaScript(
        input,
        false,
        MERGE_INTERVAL_FUNCTIONNAME,
        MERGE_INTERVAL_REFERENCE_ERROR_CODE
      );
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error).toBeInstanceOf(ExecutionError);
      expect(error.name).toBe("Reference Error");
    }
  });
});
describe("VerifyCases", () => {
  test("Should return an object with type example and data passed", async () => {
    //Arange
    const verifyVariable = null;

    //Act
    const result = await verifyCases(
      true,
      MERGE_INTERVAL_CASES,
      MERGE_INTERVAL_SUCCESS_CODE,
      MERGE_INTERVAL_FUNCTIONNAME,
      verifyVariable
    );

    //Assert
    expect(result).toEqual(MERGE_INTERVAL_SUCCESS_RESULT);
  });
  test("Should return an object with type example and data not passed", async () => {
    //Arange
    const verifyVariable = null;

    //Act
    const result = await verifyCases(
      true,
      MERGE_INTERVAL_CASES,
      MERGE_INTERVAL_FAILED_CODE,
      MERGE_INTERVAL_FUNCTIONNAME,
      verifyVariable
    );

    //Assert
    expect(result).toEqual(MERGE_INTERVAL_FAILED_RESULT);
  });
  test("Should return an object with error", async () => {
    //Arange
    const verifyVariable = null;

    //Act
    const result = await verifyCases(
      false,
      MERGE_INTERVAL_CASES,
      MERGE_INTERVAL_REFERENCE_ERROR_CODE,
      MERGE_INTERVAL_FUNCTIONNAME,
      verifyVariable
    );

    //Assert
    expect(result).toEqual(MERGE_INTERVAL_ERROR_RESULT);
  });
});

const MERGE_INTERVAL_CASES = [
  {
    input: [
      [
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ],
    ],
    output: [
      [1, 6],
      [8, 10],
      [15, 18],
    ],
  },
  {
    input: [
      [
        [1, 4],
        [4, 5],
      ],
    ],
    output: [[1, 5]],
  },
];
const MERGE_INTERVAL_SUCCESS_CODE = `/**
      * @param {number[][]} intervals
      * @return {number[][]}
      */
     var merge = function(intervals) {
         if(intervals.length === 0){
             return intervals;
         }
         console.log("hi there")
         intervals.sort((a,b) => a[0]-b[0]);
         const ans = [];
         let start = intervals[0][0];
         let end = intervals[0][1];
         for(let i=1; i<intervals.length; i++){
             if(end >= intervals[i][0]){
                 end = Math.max(end, intervals[i][1]);
             }
             else{
                 ans.push([start, end]);
                 start = intervals[i][0];
                 end = intervals[i][1];
             }
         }
         ans.push([start, end]);
         return ans;
     };`;
const MERGE_INTERVAL_FAILED_CODE = `/**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    var merge = function(intervals) {
        return intervals;
    };`;
const MERGE_INTERVAL_SYNTAX_ERROR_CODE = `/**
* @param {number[][]} intervals
* @return {number[][]}
*/
var merge = function(intervals) {
   if(intervals.length === 0){
       return intervals;
   }
   intervals.sort((a,b) => a[0]-b[0]);
   const ans = [;
   ans.push([start, end]);
   return ans;
};`;
const MERGE_INTERVAL_REFERENCE_ERROR_CODE = `/**
* @param {number[][]} intervals
* @return {number[][]}
*/
var merge = function(intervals) {
   if(intervals.length === 0){
       return intervals;
   }
   intervals.sort((a,b) => a[0]-b[0]);
   ans.push([start, end]);
   return ans;
};`;
const MERGE_INTERVAL_FUNCTIONNAME = "merge";
const MERGE_INTERVAL_SUCCESS_RESULT = {
  type: "example",
  data: [
    {
      passed: true,
      stdout: ["hi there"],
      output: [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
      expected: [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
    },
    {
      passed: true,
      stdout: ["hi there"],
      output: [[1, 5]],
      expected: [[1, 5]],
    },
  ],
};
const MERGE_INTERVAL_FAILED_RESULT = {
  type: "example",
  data: [
    {
      passed: false,
      stdout: [],
      output: [
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ],
      expected: [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
    },
    {
      passed: false,
      stdout: [],
      output: [
        [1, 4],
        [4, 5],
      ],
      expected: [[1, 5]],
    },
  ],
};
const MERGE_INTERVAL_ERROR_RESULT = {
  type: "error",
  data: {
    name: "Reference Error",
    message: "ReferenceError: Can't find variable: ans",
    line: "10",
  },
};
