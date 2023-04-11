import fs from "fs";
import { FileSystem } from "../interfaces/fileSystem";

export const fileSystem: FileSystem = {
  lstat: fs.promises.lstat,
  readFile: fs.promises.readFile,
  writeFile: fs.promises.writeFile
};
