import { safeExecute } from "../../utils/safeExecute";
import { fileSystem } from "../../infrastructure/fileSystem";
import { path } from "../../infrastructure/path";

export const saveToFile = async (
  outputDirectory: string,
  arg: { [fileName: string]: string }
): Promise<void> => {
  for (const fileName of Object.keys(arg)) {
    const filePath = path.join(outputDirectory, fileName);
    const { error } = await safeExecute<void>(
      fileSystem.writeFile(filePath, arg[fileName])
    );

    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log(`Response saved to file: ${filePath}`);
  }
};
