import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { Command } from "commander";
import { Configuration, OpenAIApi } from "openai";
// import { generateTestCases } from "./createTest/parseTestCases";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();
program.version("0.0.1");

dotenv.config();
export const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
});
export const openai = new OpenAIApi(configuration);

export const chatGPT = async (input: string): Promise<string> => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: input,
    max_tokens: 2048,
    n: 1,
    stop: null,
    temperature: 0.5,
  });

  const concatenatedResponses = response.data.choices
    .map((choice) => choice.text)
    .join("\n");
  return concatenatedResponses;
};

/**
 * Create Template `.md` file
 */
program
  .command("create-template")
  .description("Create a new markdown template file for TDD prompts.")
  .action(async () => {
    const promptsDir = path.join(
      __dirname,
      "..",
      "src",
      "chatGPT",
      "tdd",
      "prompts"
    );

    try {
      await fs.promises.access(promptsDir);
    } catch {
      await fs.promises.mkdir(promptsDir, { recursive: true });
    }

    const { fileName } = await inquirer.prompt([
      {
        type: "input",
        name: "fileName",
        message: "Enter the file name:",
        default: "new-prompt.md",
        validate: (input: string) =>
          input.length > 0 || "File name cannot be empty",
      },
    ]);

    const fullFileName = `${fileName}.md`;
    const filePath = path.join(promptsDir, fullFileName);

    const template = `あなたは、TypeScriptプログラマーです。
以下のyamlファイルに従って、TypeScriptコードを生成して下さい。
\n
~~~yaml
Prompt:

branch condition:
-

Coding convention:
-

[Cases]

case1: ""
  inputs:
    - {
        input:
        output:
      }
    - {
        input:
        output:
      }
~~~
`;

    await fs.promises.writeFile(filePath, template);
    console.log(`Template file created at ${filePath}`);
  });

/**
 * run tdd
 * 1. select testPackage
 * 2. select markdownFile #TODO: コマンドでパスを渡す
 * 3. send prompt for ChatGPT
 * 4. refactoring loop
 * 5. createTestCode
 * 6. select output directory (testCode) #TODO: 出力先は一意のディレクトリで良い
 * 7. execution test
 * 8.
 */

/**
 * 1. select testPackage
 */
export const selectTestPackage = async () => {
  const { testPackage } = await inquirer.prompt([
    {
      type: "list",
      name: "testPackage",
      message: "Select the test package to use:",
      choices: ["jest", "vitest"],
      default: "jest",
    },
  ]);
  return testPackage;
};

export const readMarkdownFile = async (filePath: string): Promise<any> => {
  const fileContent = await fs.promises.readFile(filePath, "utf8");
  return fileContent;
};

const getFilesAndDirectories = async (directory: string): Promise<string[]> => {
  const entries = await fs.promises.readdir(directory, { withFileTypes: true });
  return entries.map((entry) => entry.name);
};

/**
 * 2. selectMarkdownFile
 */
export const selectMarkdownFile = async (
  currentDir: string = process.cwd()
): Promise<string> => {
  const entries = await getFilesAndDirectories(currentDir);

  const { selectedEntry } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedEntry",
      message: "Select a file or directory:",
      choices: entries,
    },
  ]);

  const selectedEntryPath = path.join(currentDir, selectedEntry);
  const entryStats = await fs.promises.stat(selectedEntryPath);

  if (entryStats.isDirectory()) {
    return selectMarkdownFile(selectedEntryPath);
  } else if (path.extname(selectedEntryPath) === ".md") {
    return selectedEntryPath;
  } else {
    console.log("Please select a markdown file.");
    return selectMarkdownFile(currentDir);
  }
};

/**
 * 3. selectOutputDirectory
 */
export const selectOutputDirectory = async (
  currentDir: string = process.cwd()
): Promise<string> => {
  const entries = await getFilesAndDirectories(currentDir);
  const choices = [
    { name: "Select this directory", value: currentDir },
    ...entries,
  ];

  const { selectedEntry } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedEntry",
      message: "Select an output directory:",
      choices: choices,
    },
  ]);

  if (selectedEntry === currentDir) {
    return currentDir;
  } else {
    const selectedEntryPath = path.join(currentDir, selectedEntry);
    const entryStats = await fs.promises.stat(selectedEntryPath);

    if (entryStats.isDirectory()) {
      return selectOutputDirectory(selectedEntryPath);
    } else {
      console.log("Please select a directory.");
      return selectOutputDirectory(currentDir);
    }
  }
};

/**
 * 3. responseChatGPT
 */
export const saveResponseToFile = async (
  outputDirectory: string,
  fileName: string,
  content: string
): Promise<void> => {
  const filePath = path.join(outputDirectory, `${fileName}.md`);
  await fs.promises.writeFile(filePath, content);
  console.log(`Response saved to file: ${filePath}`);
};

export const runRefactoringLoop = async (
  initialCode: string
): Promise<string> => {
  let chatGPTResponse = initialCode;

  while (true) {
    // Add a question to ask if the user wants to refactor the code
    const { refactor } = await inquirer.prompt([
      {
        type: "confirm",
        name: "refactor",
        message: "Do you want to refactor the generated code?",
        default: false,
      },
    ]);

    if (!refactor) break;

    const { refactoringMethod } = await inquirer.prompt([
      {
        type: "input",
        name: "refactoringMethod",
        message: "How would you like to refactor the code?",
        validate: (input: string) =>
          input.length > 0 || "Refactoring method cannot be empty",
      },
    ]);
    const refactoringPrompt = `以下のコードを要件に合うようにリファクタリングしてください。\n\n${chatGPTResponse}\n\[要件]: ${refactoringMethod}`;
    chatGPTResponse = await chatGPT(refactoringPrompt);
    console.log("Refactored ChatGPT response:", chatGPTResponse);
  }
  return chatGPTResponse;
};

export const generateTestCode = async (
  refactoredFunction: string,
  testPackage: string,
  markdownFileContent?: string
): Promise<string> => {
  const promptMarkdown = `以下の関数のテストコードを作成して下さい。\n
  ${refactoredFunction}\n\n
  テストパッケージには${testPackage}を用いて下さい。\n
  また、テストケースには以下のマークダウンファイルの[TestCases]を参考にして下さい。\n
  ${markdownFileContent}
  `;

  const prompt = promptMarkdown;
  const testCode = await chatGPT(prompt);
  console.log("Generated test code:", testCode);
  return testCode;
};

export const runTDD = async () => {
  try {
    // NOTE: testPackageの選択
    const testPackage = await selectTestPackage();
    const filePath = await selectMarkdownFile();
    const markdownFileContent = await readMarkdownFile(filePath);
    let chatGPTResponse = await chatGPT(markdownFileContent);
    console.log("ChatGPT response:", chatGPTResponse);

    const fileName = path.basename(filePath, path.extname(filePath));
    chatGPTResponse = await runRefactoringLoop(chatGPTResponse);

    const testCode = await generateTestCode(
      chatGPTResponse,
      testPackage,
      markdownFileContent
    );

    const outputDirectory = await selectOutputDirectory();
    await saveResponseToFile(outputDirectory, fileName, chatGPTResponse);
  } catch (error) {
    console.error(error.message);
  }
};

program
  .command("run-tdd")
  .description("Run TDD based on the selected markdown file")
  .action(async () => await runTDD());

program.parse(process.argv);
