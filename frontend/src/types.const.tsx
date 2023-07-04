export interface Tag {
  id: number;
  title: string;
}
export interface Problem {
  id: number;
  title: string;
  difficulty: string;
  solutionVideo: string;
  tags: Tag[];
}

export interface ExampleCase {
  input: any[];
  output: any;
  explanation: string | null;
  image: string | null;
}

export interface ProblemDetails {
  id: number;
  title: string;
  difficulty: string;
  description: string;
  constraints: string[];
  inputKeys: string[];
  solutionVideo: string;
  boilerplate: string;
  exampleCases: ExampleCase[];
  tags: Tag[];
}

export interface RunResult {
  expected: any;
  output: any;
  passed: boolean;
  stdout: string[];
}

export interface ExecutionError {
  line: string | undefined;
  message: string;
  name: string;
}

export interface SubmitResult {
  passed: boolean;
  input: any[] | undefined;
  output: any;
  expected: any;
}

export interface Player {
  id: number;
  name: string;
  gameId: number;
}

export interface PlayerProgress {
  id: number;
  name: string;
  finishedAt: Date | null;
  progress: {
    id: number;
    passed: boolean;
  }[];
}

export interface PlayerCode {
  id: number;
  name: string;
  problems: {
    id: number;
    title: string;
    code: string;
  }[];
  lastModifyedProblem?: number;
}

//atoms
export interface AuthModalState {
  isOpen: boolean;
  isLogin: boolean;
  type: "login" | "register" | "profile";
}

export interface Bullet {
  message: string;
  height: number;
  id: string;
  duration: number;
  colorName: string;
}

export interface contestHistory {
  startedAt: Date;
  contestId: number;
  problems: {
    id: number;
    title: string;
  }[];
  players: {
    name: string;
  }[];
}

export type GameHostState =
  | "GameCreating"
  | "PlayersJoining"
  | "GameWatching"
  | "GameResult"
  | "Loading";
export type GamePlayerState =
  | "GameJoining"
  | "GameWaiting"
  | "GamePlaying"
  | "GameResult"
  | "Loading";
