import * as _readline from "readline";
import {
  CustomWritableStream,
  Direction,
  Readline,
} from "src/interfaces/readline";
import { container } from "../container";

export const readline: Readline = {
  createInterface: _readline.createInterface({
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
    _readline.cursorTo(stream as any, x, y);
  },
  clearLine: (stream: CustomWritableStream, dir: Direction) => {
    _readline.clearLine(stream as any, dir);
  },
};

container.register("readline", readline);
