import fs from "fs";
import { container } from "src/container";
import { FileSystem } from "src/interfaces/fileSystem";

const fileSystem: FileSystem = {
  lstat: fs.promises.lstat,
  readFile: fs.promises.readFile,
  writeFile: fs.promises.writeFile,
};

container.register<FileSystem>("fs", fileSystem);
