import readline from "readline";
import container from "../container";
container.register("readline", readline);
const $readline = container.resolve<typeof readline>("readline");

// TODO: di
export const useReadline = () => {
  const readline = $readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query: string): Promise<string> =>
    new Promise((resolve) => readline.question(query, resolve));

  const cursorToBeginning = () => {
    $readline.cursorTo(process.stdout, 0);
  };
  const clearCurrentLine = () => {
    $readline.clearLine(process.stdout, 0);
    $readline.cursorTo(process.stdout, 0);
  };
  return {
    question,
    cursorToBeginning,
    clearCurrentLine,
  };
};
