import { $path } from "../../plugins/path";
import { $fs } from "../../plugins/fileSystem";

export const saveResponseToFile = async (
  outputDirectory: string,
  fileName: string,
  content: string
): Promise<void | Error> => {
  const filePath = $path.join(outputDirectory, fileName);
  try {
    await $fs.promises.writeFile(filePath, content);
    console.log(`Response saved to file: ${filePath}`);
  } catch (error: any) {
    return new Error(error);
  }
};
