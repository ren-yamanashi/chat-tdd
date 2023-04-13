import path from "path";
import { container } from "src/container";
import { Path } from "../interfaces/path";

export const _path: Path = {
  extName: path.extname,
  resolve: path.resolve,
  baseName: path.basename,
  join: path.join,
};

container.register<Path>("path", _path);
