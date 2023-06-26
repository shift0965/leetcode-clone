const expressBase = import.meta.env.VITE_EXPRESS_URL;
const socketBase = import.meta.env.VITE_SCOKET_URL;

export const GET_ALL_PROBLEMS = `${expressBase}/api/1.0/problems/`;
export const GET_PROBLEM_DETAILS = `${expressBase}/api/1.0/problems/details`;
export const RUN_EXAMPLE_CASES = `${expressBase}/api/1.0/workspace/run`;
export const RUN_TEST_CASES = `${expressBase}/api/1.0/workspace/submit`;

//user authentication
export const USER_SIGNIN = `${expressBase}/api/1.0/user/signin`;
export const USER_SIGNUP = `${expressBase}/api/1.0/user/signup`;

//contest
export const HOST_CHECK_GAME = `${expressBase}/api/1.0/contest/hostCheckGame`;
export const HOST_CREATE_GAME = `${expressBase}/api/1.0/contest/hostCreateGame`;
export const HOST_SHOT_DOWN = `${expressBase}/api/1.0/contest/hostTerminateGame`;

export const PLAYER_JOIN_GAME = `${expressBase}/api/1.0/contest/playerJoinGame`;
export const PLAYER_CHECK_GAME = `${expressBase}/api/1.0/contest/playerCheckGame`;
export const PLAYER_AVATAR_URL =
  "https://api.dicebear.com/6.x/avataaars/svg?size=64";
// "https://api.dicebear.com/6.x/adventurer/svg?size=64";

export const PLAYER_EXIT_GAME = `${expressBase}/api/1.0/contest/playerExitGame`;

export const GET_CONTEST_PLAYERS = `${expressBase}/api/1.0/contest/getContestPlayers`;

export const WEB_SOCKET_URL = socketBase;
