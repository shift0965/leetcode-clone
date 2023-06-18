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
  input: any;
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
