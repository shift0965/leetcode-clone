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
