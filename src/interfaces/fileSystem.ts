type PathLike = string | Buffer | URL;
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
type WriteFileOptions = {
  encoding?: BufferEncoding | null;
  mode?: string | number;
  flag?: string;
};

export interface FileSystem {
  lstat(path: string): Promise<{
    isFile(): boolean;
    isDirectory(): boolean;
  }>;
  readFile(
    path: PathLike,
    options?: BufferEncoding | null
  ): Promise<string | Buffer>;
  writeFile: (
    path: PathLike,
    data: string | Uint8Array,
    options?: WriteFileOptions
  ) => Promise<void>;
}
