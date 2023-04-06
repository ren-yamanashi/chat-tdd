import url from "url";
import container from "../container";
container.register("url", url);
export const $url = container.resolve<typeof url>("url");
