export type ClearLineDirection = -1 | 0 | 1;

/**
 * NodeJS.WritableStreamのカスタムinterface（どのプラットフォームでも使用できる形にカスタマイズ）
 * `Readline.cursorTo`,`Readline.clearLine`,`Readline.createInterface` で必要となる部分のみ定義
 */
export interface CustomWritableStream {
  write(
    buffer: string | Uint8Array,
    callback?: (error: Error | null) => void
  ): boolean;
  write(
    str: string,
    encoding?: BufferEncoding,
    callback?: (error: Error | null) => void
  ): boolean;
}
/**
 * NodeJS.ReadableStreamのカスタムinterface（どのプラットフォームでも使用できる形にカスタマイズ）
 * `Readline.cursorTo`,`Readline.clearLine`,`Readline.createInterface` で必要となる部分のみ定義
 */
export interface CustomReadableStream {
  on: (event: string, listener: (...arg: any[]) => void) => this;
}

export interface CreateInterfaceOptions {
  input: CustomReadableStream;
  output?: CustomWritableStream;
}
export interface ReadlineInterface {
  question: (query: string, callback: (answer: string) => void) => void;
}

/**
 * CLIを実装するためのツールを提供
 */
export interface Readline {
  /**
   * @param options `input(required)`: 入力ストリームを指定する ex: process.stdin
   * `output(option)`:  出力ストリームを指定する  ex:process.stdout
   * @returns readlineインスタンス
   */
  createInterface: (options: CreateInterfaceOptions) => ReadlineInterface;
  /**
   * @param stream どの書き込み可能なストリームに対して行をクリアするかを指定
   * ex: process.stdout
   * @param {number} x カーソルを移動させたい水平方向の位置を指定。0指定で行の先頭にカーソルが移動
   * @param {number} y カーソルを移動させたい垂直方向の位置を指定  指定しない場合、変更されない
   */
  cursorTo: (stream: CustomWritableStream, x: number, y?: number) => void;
  /**
   * @param stream どの書き込み可能なストリームに対して行をクリアするかを指定
   * ex: process.stdout
   * @param clearLineDirection どの方向で行をクリアするかを指定
   * -1：カーソル位置から行の先頭までをクリア
   * 0：カーソル位置から行の末尾までをクリア
   * 1：行全体をクリア
   */
  clearLine: (
    stream: CustomWritableStream,
    clearLineDirection: ClearLineDirection
  ) => void;
}
