export interface API {
  generateAnswer: (prompt: string) => Promise<string | Error>;
}