import * as readline from "readline";
import {
  CustomWritableStream,
  Direction,
  Readline,
} from "src/interfaces/readline";
import { container } from "../container";

export const _readline: Readline = {
  createInterface: readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),
  question: (
    interfaceInstance: Readline["createInterface"],
    query: string,
    callback: (answer: string) => void
  ) => {
    interfaceInstance.question(query, callback);
  },
  cursorTo: (stream: CustomWritableStream, x: number, y?: number) => {
    readline.cursorTo(stream as any, x, y);
  },
  clearLine: (stream: CustomWritableStream, dir: Direction) => {
    readline.clearLine(stream as any, dir);
  },
};

container.register("readline", _readline);
