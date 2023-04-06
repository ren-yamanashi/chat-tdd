import readline from "readline"
import container from "../container";
container.register("readline", readline);
export const $readline = container.resolve<typeof readline>("readline");
