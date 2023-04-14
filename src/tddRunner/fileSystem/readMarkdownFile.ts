import { container } from "src/container";
import { FileSystem } from "src/interfaces/fileSystem";
import { safeExecute } from "src/utils/safeExecute";

/**
 * markdownファイルの読み込んで、文字列で返す
 * @param filePath markdownファイルのパス 末尾は`.md`
 */
export const readMarkdownFile = async (filePath: string): Promise<string> => {
  const fs = container.resolve<FileSystem>("fs");

  if (!filePath) {
    console.error("Error: Please specify a file path.");
    process.exit(1);
  }

  const { response } = await safeExecute<{
    isFile(): boolean;
    isDirectory(): boolean;
  }>(() => fs.lstat(filePath));

  if (response?.isDirectory()) {
    console.error("Error: Please specify a Markdown file, not a directory.");
    process.exit(1);
  }
  if (!filePath.endsWith(".md")) {
    console.error("Error: The specified file is not a Markdown file.");
    process.exit(1);
  }

  const { response: contents, error } = await safeExecute<string>(
    () => fs.readFile(filePath, "utf8") as Promise<string>
  );

  if (!contents) {
    console.error("Error: contents of markdown file not found.");
    process.exit(1);
  }
  if (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }

  return contents;
};
