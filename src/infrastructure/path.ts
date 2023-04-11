import * as _path from "path";
import { Path } from "../interfaces/path";

export const path: Path = {
  extname: _path.extname,
  resolve: _path.resolve,
  basename: _path.basename,
  join: _path.join,
};
