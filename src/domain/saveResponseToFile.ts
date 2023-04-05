import fs from "fs";
import path from "path";

export const saveResponseToFile = async (
  outputDirectory: string,
  fileName: string,
  content: string
): Promise<void> => {
  const filePath = path.join(outputDirectory, fileName);
  await fs.promises.writeFile(filePath, content);
  console.log(`Response saved to file: ${filePath}`);
};
