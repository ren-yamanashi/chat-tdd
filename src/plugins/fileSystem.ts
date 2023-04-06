import fs from "fs";
import container from "../container";
container.register("fs", fs);
export const $fs = container.resolve<typeof fs>("fs");
