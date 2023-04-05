import fs from "fs";
import path from "path";
import * as config from "../chatTdd.config";
import { Command } from "commander";
import { chatGPT } from "./plugins/chatGPT";
import { readMarkdownFile } from "./domain/readMarkdown";
import { runRefactoringLoop } from "./domain/refactoringLoop";
import { generateTestCode } from "./domain/generateTestCode";
import { saveResponseToFile } from "./domain/saveResponseToFile";

const program = new Command();
program.version("0.0.1");

/**
 * run tdd
 * 1. readMarkdown
 * 2. send prompt for chatGPT
 * 4. refactoringLoop
 * 5. generateTestCode
 * 6. saveResponseToFile
 * 7. execution test
 */

export const runTDD = async (filePath: string) => {
  if (!filePath) {
    console.error("Error: Please specify a file path.");
    process.exit(1);
  }
  const isDirectory = (await fs.promises.lstat(filePath)).isDirectory();
  if (isDirectory) {
    console.error("Error: Please specify a Markdown file, not a directory.");
    process.exit(1);
  }

  try {
    const testPackage = config.default.testPackage;
    const markdownFileContent = await readMarkdownFile(filePath);

    let chatGPTResponse = await chatGPT(markdownFileContent);
    console.log("[ChatGPT response]\n\n", chatGPTResponse);

    const fileName = path.basename(filePath, path.extname(filePath));
    chatGPTResponse = await runRefactoringLoop(chatGPTResponse);

    const testCode = await generateTestCode(
      chatGPTResponse,
      testPackage,
      markdownFileContent
    );

    const outputDirectory = path.resolve(config.default.outputDir);
    await saveResponseToFile(
      outputDirectory,
      `${fileName}.md`,
      chatGPTResponse
    );
    await saveResponseToFile(outputDirectory, `${fileName}.spec.ts`, testCode);
  } catch (error: any) {
    console.error(error.message);
  }
};

program
  .command("run-tdd <filePath>", { isDefault: true })
  .description("Run TDD based on the selected markdown file")
  .action(runTDD);

program.parse(process.argv);
