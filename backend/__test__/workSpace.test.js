import { RUN_EXAMPLE_CASES, RUN_TEST_CASES } from "./apis.test.js";

describe("Problems route", () => {
  test("Runcode Success", async () => {
    const response = await fetch(RUN_EXAMPLE_CASES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemId: 106,
        language: "js",
        code: `/**
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
       };`,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.type).toBe("example");
    expect(result.data[0].passed).toBe(true);
  });
  test("Runcode Success", async () => {
    const response = await fetch(RUN_TEST_CASES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        problemId: 106,
        language: "js",
        code: `/**
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
       };`,
      }),
    });
    const result = await response.json();
    expect(response.status).toBe(200);
    expect(result.type).toBe("test");
    expect(result.data.passed).toBe(true);
  });
});
