import path from "path"
import container from "../container";
container.register("path", path);
export const $path = container.resolve<typeof path>("path");
