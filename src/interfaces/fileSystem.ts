export interface FileSystem {
  lstat(path: string): Promise<{
    isFile(): boolean;
    isDirectory(): boolean;
  }>;
  // TODO: any型の修正
  readFile: any;
  writeFile: any;
}
