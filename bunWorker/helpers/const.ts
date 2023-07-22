export type inputCases = {
  input: any;
  output: any;
};

export class ExecutionError extends Error {
  line: number | undefined;
  constructor(name: string, message: string, line: number | undefined) {
    super(message);
    this.message = message;
    this.line = line;
    this.name = name;
  }
}
