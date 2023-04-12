import fs from "fs";
import { FileSystem } from "src/interfaces/fileSystem";


export const fileSystem: FileSystem = {
  lstat: fs.promises.lstat,
  readFile: fs.promises.readFile,
  writeFile: fs.promises.writeFile
};
