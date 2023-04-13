import { container } from "src/container";
import { Readline } from "src/interfaces/readline";

// TODO: 別ファイルに切り出し
export const useReadline = () => {
  const readline = container.resolve<Readline>("readline");
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> =>
    new Promise((resolve) => readlineInterface.question(query, resolve));

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
