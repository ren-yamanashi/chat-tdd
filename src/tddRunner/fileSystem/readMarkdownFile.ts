import { safeExecute } from "src/utils/safeExecute";
import { fileSystem } from "../../infrastructure/fileSystem";

export const readMarkdownFile = async (filePath: string) => {
  if (!filePath) {
    console.error("Error: Please specify a file path.");
    process.exit(1);
  }

  const { response } = await safeExecute<{
    isFile(): boolean;
    isDirectory(): boolean;
  }>(() => fileSystem.lstat(filePath));

  if (response?.isDirectory()) {
    console.error("Error: Please specify a Markdown file, not a directory.");
    process.exit(1);
  }
  if (!filePath.endsWith(".md")) {
    console.error("Error: The specified file is not a Markdown file.");
    process.exit(1);
  }

  const { response: contents, error } = await safeExecute<string>(
    () => fileSystem.readFile(filePath, "utf8") as Promise<string>
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
