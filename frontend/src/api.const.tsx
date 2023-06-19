const expressBase = import.meta.env.VITE_EXPRESS_URL;
export const GET_ALL_PROBLEMS = `${expressBase}/api/1.0/problems/`;
export const GET_PROBLEM_DETAILS = `${expressBase}/api/1.0/problems/details`;
export const RUN_EXAMPLE_CASES = `${expressBase}/api/1.0/workspace/run`;
export const RUN_TEST_CASES = `${expressBase}/api/1.0/workspace/submit`;
