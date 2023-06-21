const expressBase = import.meta.env.VITE_EXPRESS_URL;
const socketBase = import.meta.env.VITE_SCOKET_URL;

export const GET_ALL_PROBLEMS = `${expressBase}/api/1.0/problems/`;
export const GET_PROBLEM_DETAILS = `${expressBase}/api/1.0/problems/details`;
export const RUN_EXAMPLE_CASES = `${expressBase}/api/1.0/workspace/run`;
export const RUN_TEST_CASES = `${expressBase}/api/1.0/workspace/submit`;

export const HOST_CREATE_ROOM = `${expressBase}/api/1.0/contest/createGame`;
export const Player_JOIN_ROOM = `${expressBase}/api/1.0/contest/joinGame`;

export const WEB_SOCKET_URL = socketBase;
