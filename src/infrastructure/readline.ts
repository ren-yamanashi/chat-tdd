import * as readline from "readline";
import {
  CustomWritableStream,
  ClearLineDirection,
  Readline,
  CreateInterfaceOptions,
} from "src/interfaces/readline";
import { container } from "../container";

export const _readline: Readline = {
  createInterface: (options: CreateInterfaceOptions) => {
    const rl = readline.createInterface(options as any);
    return {
      question: (query: string, callback: (answer: string) => void) => {
        rl.question(query, callback);
      },
      close: rl.close(),
    };
  },
  cursorTo: (stream: CustomWritableStream, x: number, y?: number) => {
    readline.cursorTo(stream as any, x, y);
  },
  clearLine: (stream: CustomWritableStream, dir: ClearLineDirection) => {
    readline.clearLine(stream as any, dir);
  },
};

container.register("readline", _readline);
