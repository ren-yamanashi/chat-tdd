import * as _path from "path";
import { Path } from "../interfaces/path";

export const path: Path = {
  extName: _path.extname,
  resolve: _path.resolve,
  baseName: _path.basename,
  join: _path.join,
};
