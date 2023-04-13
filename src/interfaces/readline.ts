// TODO: 命名の変更
export type Direction = -1 | 0 | 1;

// NOTE: NodeJS.WritableStreamのカスタムinterface（どのプラットフォームでも使用できる形にカスタマイズ）
// Readline.cursorToとReadline.clearLineで必要となる部分のみ定義
export interface CustomWritableStream {
  write(
    buffer: string | Uint8Array,
    cb?: (error: Error | null) => void
  ): boolean;
  write(
    str: string,
    encoding?: BufferEncoding,
    cb?: (error: Error | null) => void
  ): boolean;
}

export interface Readline {
  // TODO: any型を直す
  createInterface: any;
  question(
    interfaceInstance: Readline["createInterface"],
    query: string,
    callback: (answer: string) => void
  ): void;
  cursorTo: (stream: CustomWritableStream, x: number, y?: number) => void;
  clearLine: (stream: CustomWritableStream, dir: Direction) => void;
}
