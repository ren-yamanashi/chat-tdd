import fs from "fs";

export const readMarkdownFile = async (filePath: string): Promise<any> => {
  const fileContent = await fs.promises.readFile(filePath, "utf8");
  return fileContent;
};
