import { container } from "../../container";
import { FileSystem } from "../../interfaces/fileSystem";

type Config = {
  testPackage: string;
  outputDir: string;
};

export const isConfigObj = (arg: unknown): arg is Config =>
  typeof arg === "object" &&
  arg !== null &&
  "testPackage" in arg &&
  "outputDir" in arg &&
  typeof (arg as { testPackage: unknown }).testPackage === "string" &&
  typeof (arg as { outputDir: unknown }).outputDir === "string";

/**
 * configFile(json形式)を読み込んで、オブジェクト形式で返す
 * @param path configファイルのパス 末尾は`.json`
 */
export const readConfigFile = async (path: string): Promise<Config> => {
  const fs = container.resolve<FileSystem>("fs");

  if (!path.endsWith(".json")) {
    console.error("The provided file is not a JSON file");
    process.exit(1);
  }

  const configFile = (await fs.readFile(path, "utf-8")) as string;
  const configObj: unknown = JSON.parse(configFile);

  if (!isConfigObj(configObj)) {
    console.error("Invalid configuration file format");
    process.exit(1);
  }

  return {
    testPackage: configObj.testPackage,
    outputDir: configObj.outputDir,
  };
};
