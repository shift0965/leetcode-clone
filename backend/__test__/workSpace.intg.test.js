import { RUN_EXAMPLE_CASES, RUN_TEST_CASES } from "./apis.js";

describe("Test Run Code", () => {
  test("Should return object with example input, output and currect answer", async () => {
    const response = await fetch(RUN_EXAMPLE_CASES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemId: PERMUNATION_PROBLEM_ID,
        language: "js",
        code: PERMUNATION_SUCCESS_CODE,
      }),
    });
    const result = await response.json();
    expect(result).toEqual(PERMUNATION_EXAMPLE_SUCCESS_RESULT);
  });
  test("Should return pass object", async () => {
    const response = await fetch(RUN_TEST_CASES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemId: PERMUNATION_PROBLEM_ID,
        language: "js",
        code: PERMUNATION_SUCCESS_CODE,
      }),
    });
    const result = await response.json();
    console.log(JSON.stringify(result));
    expect(response.status).toBe(200);
    expect(result).toEqual(PERMUNATION_HIDDEN_SUCCESS_RESULT);
  });
});

const PERMUNATION_PROBLEM_ID = 106;
const PERMUNATION_SUCCESS_CODE = `/**
* @param {number[]} nums
* @return {number[][]}
*/
var permute = function(nums) {
   let output = [];
   
   function backtrack(first){
       if(first === nums.length) output.push([...nums]);
       for(let i = first; i < nums.length; i++){
           [nums[first], nums[i]] = [nums[i], nums[first]];
       
           backtrack(first + 1);
           [nums[first], nums[i]] = [nums[i], nums[first]];
       }      
   }
   
   backtrack(0);
   return output;
};`;
const PERMUNATION_EXAMPLE_SUCCESS_RESULT = {
  type: "example",
  data: [
    {
      passed: true,
      stdout: [],
      output: [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 2, 1],
        [3, 1, 2],
      ],
      expected: [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1],
      ],
    },
    {
      passed: true,
      stdout: [],
      output: [
        [0, 1],
        [1, 0],
      ],
      expected: [
        [0, 1],
        [1, 0],
      ],
    },
    { passed: true, stdout: [], output: [[1]], expected: [[1]] },
  ],
};
const PERMUNATION_HIDDEN_SUCCESS_RESULT = {
  type: "test",
  data: { passed: true },
};
