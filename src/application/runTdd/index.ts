import * as config from "../../../chatTdd.config";
import { generateAnswer } from "../../infrastructure/apis/generateAnswer";
import { runRefactoringLoop } from "../../modules/refactoringLoop";
import { generateTestCode } from "../../modules/generateTestCode";
import { saveResponseToFile } from "./saveResponseToFile";
import { $fs } from "../../plugins/fileSystem";
import { $path } from "../../plugins/path";
import { useLoad } from "../../useCases/load";
import { useReadline } from "../../infrastructure/readline";

/**
 * run tdd
 * 1. read markdown
 * 2. send prompt
 * 4. refactoring loop
 * 5. generate testCode
 * 6. execution test
 * 7. saveResponse to file
 */
export const runTDD = async (filePath: string): Promise<void> => {
  const readline = useReadline();
  const load = useLoad(readline.cursorToBeginning, readline.clearCurrentLine);
  if (!filePath) {
    console.error("Error: Please specify a file path.");
    process.exit(1);
  }
  // TODO: ディレクトリでも受け取れるようにする
  const isDirectory = (await $fs.promises.lstat(filePath)).isDirectory();
  if (isDirectory) {
    console.error("Error: Please specify a Markdown file, not a directory.");
    process.exit(1);
  }
  const extname = $path.extname(filePath);
  if (extname !== ".md") {
    console.error("Error: The specified file is not a Markdown file.");
    process.exit(1);
  }

  try {
    /** read markdown */
    const markdownFileContent: string = await $fs.promises.readFile(
      filePath,
      "utf8"
    );

    /** send prompt */
    let _load = load.start();
    let chatGPTResponse: string = await generateAnswer(markdownFileContent);
    load.stop(_load);
    console.log("[Code]\n", chatGPTResponse);

    /** refactoring loop */
    chatGPTResponse = await runRefactoringLoop({
      question: readline.question,
      generateAnswer,
      chatGPTResponse,
      startLoad: load.start,
      stopLoad: load.stop,
    });

    /** generateTestCode */
    const testPackage = config.default.testPackage;
    _load = load.start();
    const testCode = await generateTestCode({
      generateAnswer,
      refactoredCode: chatGPTResponse,
      testPackage,
      markdownFileContent,
    });
    load.stop(_load);

    /** saveResponse to file */
    const outputDirectory = $path.resolve(config.default.outputDir);
    const fileName = $path.basename(filePath, $path.extname(filePath));
    // TODO: エラーがreturnされた時の対応
    // NOTE: TsCode
    await saveResponseToFile(
      outputDirectory,
      `${fileName}.md`,
      chatGPTResponse
    );
    // NOTE: TestCode
    await saveResponseToFile(outputDirectory, `${fileName}.spec.md`, testCode);

    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    return;
  }
};