const socketBase = import.meta.env.VITE_SCOKET_URL;

export const GET_ALL_PROBLEMS = "/api/1.0/problems/";
export const GET_PROBLEM_DETAILS = "/api/1.0/problems/details";
export const RUN_EXAMPLE_CASES = "/api/1.0/workspace/run/example";
export const RUN_HIDDEN_CASES = "/api/1.0/workspace/run/hidden";

//user authentication
export const USER_SIGNIN = "/api/1.0/user/signin";
export const USER_SIGNUP = "/api/1.0/user/signup";

//contest
export const HOST_CHECK_GAME = "/api/1.0/contest/hostCheckGame";
export const HOST_CREATE_GAME = "/api/1.0/contest/hostCreateGame";
export const HOST_SHOT_DOWN = "/api/1.0/contest/hostTerminateGame";
export const HOST_START_GAME = "/api/1.0/contest/hostStartGame";
export const HOST_GET_PLAYERS_CODE = "/api/1.0/contest/hostGetPlayersCode";
export const HOST_SEND_MESSAGE = "/api/1.0/contest/hostSendMessage";
export const HOST_CLOSE_GAME = "/api/1.0/contest/hostCloseGame";
export const HOST_GET_HISTORY = "/api/1.0/contest/hostGetHistory";
export const HOST_CLEAR_HISTORY = "/api/1.0/contest/hostClearHistory";

export const PLAYER_JOIN_GAME = "/api/1.0/contest/playerJoinGame";
export const PLAYER_CHECK_GAME = "/api/1.0/contest/playerCheckGame";
export const PLAYER_AVATAR_URL =
  "https://api.dicebear.com/6.x/avataaars/svg?size=64";
export const PLAYER_EXIT_GAME = "/api/1.0/contest/playerExitGame";
export const PLAYER_SUBMIT = "/api/1.0/contest/playerSubmit";

export const GET_CONTEST_PLAYERS = "/api/1.0/contest/getPlayers";
export const GET_CONTEST_PROBLEMS = "/api/1.0/contest/getProblems";
export const GET_PLAYER_PROGRESS = "/api/1.0/contest/getPlayersProgress";
export const GET_TIME_LIMIT = "/api/1.0/contest/getTimeLimit";
export const GET_GAME_RESULT = "/api/1.0/contest/getGameResult";

//web socket
export const WEB_SOCKET_URL = socketBase;
