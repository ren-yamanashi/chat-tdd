type PathLike = string | Buffer | URL
type BufferEncoding =
  | "ascii"
  | "utf8"
  | "utf-8"
  | "utf16le"
  | "ucs2"
  | "ucs-2"
  | "base64"
  | "latin1"
  | "binary"
  | "hex";

export interface ReadFile {
  (
    path: PathLike,
    options?: { encoding?: null; flag?: string | null }
  ): Promise<Buffer>;
  (
    path: PathLike,
    options: BufferEncoding | { encoding: BufferEncoding; flag?: string | null }
  ): Promise<string>;
}

export interface FileSystem {
  lstat(path: string): Promise<{
    isFile(): boolean;
    isDirectory(): boolean;
  }>;
  // TODO: any型の修正
  readFile(path:PathLike,options?:BufferEncoding | null): Promise<string | Buffer>;
  writeFile: any;
}
