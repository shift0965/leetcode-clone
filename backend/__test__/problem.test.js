import { GET_ALL_PROBLEMS, GET_PROBLEM_DETAILS } from "./apis.test.js";

describe("Problems route", () => {
  test("Get Problems Success: normal", async () => {
    const response = await fetch(GET_ALL_PROBLEMS);
    expect(response.status).toBe(200);
  });

  test("Get Problem Details Failed: id not number", async () => {
    const response = await fetch(
      GET_PROBLEM_DETAILS + "?id=!@#$%!@GA$GQ$GHSETWGHAGAWE$#!@%"
    );
    expect(response.status).toBe(400);
    const result = await response.json();
    expect(result.errors).toBe("Invalid value");
  });

  test("Get Problem Details Failed: id number too large", async () => {
    const response = await fetch(
      GET_PROBLEM_DETAILS + "?id=999999999999999999999999999"
    );
    expect(response.status).toBe(404);
  });

  test("Get Problem Details Failed: id number negative", async () => {
    const response = await fetch(GET_PROBLEM_DETAILS + "?id=-1");
    expect(response.status).toBe(404);
  });
});
