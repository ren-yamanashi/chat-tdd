import { container } from "src/container";
import { FileSystem } from "src/interfaces/fileSystem";

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

export const readConfigFile = async (path: string): Promise<Config> => {
  const fs = container.resolve<FileSystem>("fs");

  const configFile = (await fs.readFile(path, "utf-8")) as string;
  const configObj: unknown = JSON.parse(configFile);

  if (!isConfigObj(configObj)) {
    console.error("INvalid configuration file format");
    process.exit(1);
  }

  return {
    testPackage: configObj.testPackage,
    outputDir: configObj.outputDir,
  };
};
