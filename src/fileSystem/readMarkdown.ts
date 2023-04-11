export const readMarkdownFile = (filePath: string) => {
  if (filePath.endsWith(".md")) {
    console.error("Error: The specified file is not a Markdown file.");
    process.exit(1);
  }
};
