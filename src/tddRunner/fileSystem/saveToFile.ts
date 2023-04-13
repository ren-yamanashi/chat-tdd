import { safeExecute } from "../../utils/safeExecute";
import { container } from "src/container";
import { FileSystem } from "src/interfaces/fileSystem";
import { Path } from "src/interfaces/path";

export const saveToFile = async (
  outputDirectory: string,
  arg: { [fileName: string]: string }
): Promise<void> => {
  const fs = container.resolve<FileSystem>("fs");
  const path = container.resolve<Path>("path");

  for (const fileName of Object.keys(arg)) {
    const filePath = path.join(outputDirectory, fileName);
    const { error } = await safeExecute<void>(() =>
      fs.writeFile(filePath, arg[fileName])
    );

    if (error) {
      console.error(error);
      process.exit(1);
    }
    console.log(`Response saved to file: ${filePath}`);
  }
};
