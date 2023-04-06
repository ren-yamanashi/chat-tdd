import commander from "commander";
import container from "../container";
container.register("commander", commander);
export const $commander = container.resolve<typeof commander>("commander");
