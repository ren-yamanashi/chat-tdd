import { fileSystem } from "../infrastructure/fileSystem";
import { path } from "../infrastructure/path";


export const saveToFile = async (
  outputDirectory: string,
  fileName: string,
  content: string
): Promise<void | Error> => {
  const filePath = path.join(outputDirectory, fileName);
  try {
    await fileSystem.writeFile(filePath, content);
    console.log(`Response saved to file: ${filePath}`);
  } catch (error: any) {
    return new Error(error);
  }
};
