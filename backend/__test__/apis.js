import dotenv from "dotenv";
dotenv.config();
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://letscode.courater.com"
    : "http://localhost:3000";
export const GET_ALL_PROBLEMS = `${baseUrl}/api/1.0/problems/`;
export const GET_PROBLEM_DETAILS = `${baseUrl}/api/1.0/problems/details`;
export const RUN_EXAMPLE_CASES = `${baseUrl}/api/1.0/workspace/run`;
export const RUN_TEST_CASES = `${baseUrl}/api/1.0/workspace/submit`;
