import { container } from "src/container";
import { Readline } from "src/interfaces/readline";

export const useReadline = () => {
  const readline = container.resolve<Readline>("readline");

  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout as any,
  });

  const question = (query: string): Promise<string> =>
    new Promise((resolve) => readlineInterface!.question(query, resolve));

  // FIXME: any型の修正
  const cursorToBeginning = () => {
    readline.cursorTo(process.stdout as any, 0);
  };
  const clearCurrentLine = () => {
    readline.clearLine(process.stdout as any, 0);
    readline.cursorTo(process.stdout as any, 0);
  };

  return {
    question,
    cursorToBeginning,
    clearCurrentLine,
  };
};
