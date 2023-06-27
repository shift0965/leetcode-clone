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
  progress: {
    id: number;
    passed: boolean;
  }[];
}

//atoms
export interface AuthModalState {
  isOpen: boolean;
  isLogin: boolean;
  type: "login" | "register" | "forgotPassword";
}

export type GameHostState =
  | "GameCreating"
  | "PlayersJoining"
  | "GameWatching"
  | "Loading";
export type GamePlayerState =
  | "GameJoining"
  | "GameWaiting"
  | "GamePlaying"
  | "Loading";
