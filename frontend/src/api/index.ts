import { getAuthToken } from "../utils/userUtils";

const socketBase = import.meta.env.VITE_SCOKET_URL;

// Helper function for authenticated requests
async function apiRequest(url: string, options: RequestInit = {}) {
  const token = await getAuthToken();

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.errors || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// Helper function for requests that don't need authentication
async function publicRequest(url: string, options: RequestInit = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.errors || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// Problems API
export const problemsApi = {
  getAll: () => publicRequest("/api/1.0/problems/"),
  getDetails: (data: any) => publicRequest("/api/1.0/problems/details", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// Workspace API
export const workspaceApi = {
  runExampleCases: (data: any) => publicRequest("/api/1.0/workspace/run/example", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  runHiddenCases: (data: any) => publicRequest("/api/1.0/workspace/run/hidden", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// User API
export const userApi = {
  create: () => publicRequest("/api/1.0/user/create", { method: "POST" }),
};

// Host API (requires authentication)
export const hostApi = {
  checkGame: () => apiRequest("/api/1.0/contest/hostCheckGame"),
  createGame: (data: { timeLimit: number; problemList: number[] }) =>
    apiRequest("/api/1.0/contest/hostCreateGame", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  terminateGame: () => apiRequest("/api/1.0/contest/hostTerminateGame", { method: "POST" }),
  startGame: (data: { gameId: number }) => apiRequest("/api/1.0/contest/hostStartGame", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getPlayersCode: () => apiRequest("/api/1.0/contest/hostGetPlayersCode", { method: "POST" }),
  sendMessage: (data: { gameId: number; playerId: number; message: string }) =>
    apiRequest("/api/1.0/contest/hostSendMessage", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  closeGame: (data: { gameId: number }) => apiRequest("/api/1.0/contest/hostCloseGame", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getHistory: () => apiRequest("/api/1.0/contest/hostGetHistory", { method: "POST" }),
  clearHistory: () => apiRequest("/api/1.0/contest/hostClearHistory", { method: "POST" }),
};

// Player API (no authentication needed)
export const playerApi = {
  joinGame: (data: { gameId: number; playerName: string }) =>
    publicRequest("/api/1.0/contest/playerJoinGame", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  checkGame: (data: { gameId: number; playerId: number }) =>
    publicRequest("/api/1.0/contest/playerCheckGame", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  exitGame: (data: { gameId: number; playerId: number }) =>
    publicRequest("/api/1.0/contest/playerExitGame", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  submit: (data: {
    problemId: number;
    language: string;
    code: string;
    gameId: number;
    playerId: number;
    progress: any[]
  }) => publicRequest("/api/1.0/contest/playerSubmit", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// Contest API (shared)
export const contestApi = {
  getPlayers: (data: { gameId: number }) => publicRequest("/api/1.0/contest/getPlayers", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getProblems: (data: { gameId: number }) => publicRequest("/api/1.0/contest/getProblems", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getPlayersProgress: (data: { gameId: number }) =>
    publicRequest("/api/1.0/contest/getPlayersProgress", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getTimeLimit: (data: { gameId: number }) => publicRequest("/api/1.0/contest/getTimeLimit", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  getGameResult: (data: { gameId: number }) => publicRequest("/api/1.0/contest/getGameResult", {
    method: "POST",
    body: JSON.stringify(data),
  }),
};

// Constants (keep these as they are)
export const PLAYER_AVATAR_URL = "https://api.dicebear.com/6.x/avataaars/svg?size=64";
export const WEB_SOCKET_URL = socketBase;