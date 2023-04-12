import { generateAnswer } from "../infrastructure/apis/generateAnswer";
import { runRefactoringLoop } from "./generateCode/generateRefactoredCode";
import { generateTestCode } from "./generateCode/generateTestCode";
import { saveToFile } from "./fileSystem/saveToFile";
import { path } from "../infrastructure/path";
import { createLoading } from "../utils/load";
import { useReadline } from "../infrastructure/readline";
import { generateProgramCode } from "../tddRunner/generateCode/generateProgramCode";
import { readConfigFile } from "../tddRunner/fileSystem/readConfigFile";
import { readMarkdownFile } from "../tddRunner/fileSystem/readMarkdownFile";

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
  const CONFIG_FILE_PATH = "chatTdd.config.json"
  const readline = useReadline();
  const { load } = createLoading(
    readline.cursorToBeginning,
    readline.clearCurrentLine
  );
  const { testPackage, outputDir } = await readConfigFile(CONFIG_FILE_PATH);

  try {
    /** read markdown */
    const markdownFileContent: string = await readMarkdownFile(filePath);

    /** send prompt */
    const programCode: string = await generateProgramCode(
      load,
      markdownFileContent
    );

    /** refactoring loop */
    const refactoredCode: string = await runRefactoringLoop({
      load,
      question: readline.question,
      generateAnswer,
      programCode,
    });

    /** generateTestCode */
    const testCode: string = await load<string>(() =>
      generateTestCode({
        generateAnswer,
        refactoredCode,
        testPackage,
        markdownFileContent,
      })
    );

    /** saveResponse to file */
    const fileName: string = path.baseName(filePath, path.extName(filePath));
    await saveToFile(outputDir, {
      [`${fileName}.md`]: refactoredCode,
      [`${fileName}.spec.md`]: testCode,
    });

    process.exit();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    return;
  }
};
