import { runRefactoringLoop } from "./generateCode/generateRefactoredCode";
import { generateTestCode } from "./generateCode/generateTestCode";
import { saveToFile } from "./fileSystem/saveToFile";
import { createLoading } from "../utils/load";

import { generateProgramCode } from "../tddRunner/generateCode/generateProgramCode";
import { readConfigFile } from "../tddRunner/fileSystem/readConfigFile";
import { readMarkdownFile } from "../tddRunner/fileSystem/readMarkdownFile";
import { container } from "src/container";
import { Path } from "src/interfaces/path";
import { useReadline } from "src/utils/readline";
import { API } from "src/interfaces/api";

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
  const CONFIG_FILE_PATH = "chatTdd.config.json";
  const path = container.resolve<Path>("path");
  const generateAnswer =
    container.resolve<API["generateAnswer"]>("generateAnswer");
  const readline = useReadline();
  const { load } = createLoading(
    readline.cursorToBeginning,
    readline.clearCurrentLine
  );
  const { testPackage, outputDir } = await readConfigFile(CONFIG_FILE_PATH);

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
};
