import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { Command } from "commander";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const program = new Command();
program.version("0.0.1");

/** chatGPT */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY as string,
});
const openai = new OpenAIApi(configuration);

async function chatGPT(input: string): Promise<string> {
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
}

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
 */

/**
 * 1. sendChatGPT
 */
async function getMarkdownFile(directory: string): Promise<string[]> {
  const files = await fs.promises.readdir(directory);
  return files.filter((file) => path.extname(file) === ".md");
}

async function readMarkdownFile(filePath: string): Promise<any> {
  const fileContent = await fs.promises.readFile(filePath, "utf8");
  return fileContent;
}

async function selectMarkdownFile(): Promise<string> {
  const promptsDir = path.join(
    process.cwd(),
    "src",
    "chatGPT",
    "tdd",
    "prompts"
  );
  const markdownFiles = await getMarkdownFile(promptsDir);

  const { selectedFile } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedFile",
      message: "Select the markdown file to use:",
      choices: markdownFiles,
    },
  ]);

  return path.join(promptsDir, selectedFile);
}

/**
 * 2. responseChatGPT
 */
async function saveResponseToFile(
  fileName: string,
  content: string
): Promise<void> {
  const responsesDir = path.join(
    __dirname,
    "..",
    "src",
    "chatGPT",
    "tdd",
    "responses"
  );

  try {
    await fs.promises.access(responsesDir);
  } catch {
    await fs.promises.mkdir(responsesDir, { recursive: true });
  }

  const filePath = path.join(responsesDir, `${fileName}.md`);
  await fs.promises.writeFile(filePath, content);
  console.log(`Response saved to file: ${filePath}`);
}

async function runRefactoringLoop(
  initialCode: string,
  fileName: string
): Promise<string> {
  let chatGPTResponse = initialCode;
  let refactoringCount = 0;

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

    if (!refactor) {
      break;
    }

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

    refactoringCount += 1;
  }

  await saveResponseToFile(fileName, chatGPTResponse);
  return chatGPTResponse;
}

async function runTDD() {
  try {
    const filePath = await selectMarkdownFile();
    const markdownFileContent = await readMarkdownFile(filePath);

    let chatGPTResponse = await chatGPT(markdownFileContent);
    console.log("ChatGPT response:", chatGPTResponse);

    const fileName = path.basename(filePath, path.extname(filePath));

    chatGPTResponse = await runRefactoringLoop(chatGPTResponse, fileName);
  } catch (error) {
    console.error(error.message);
  }
}

program
  .command("run-tdd")
  .description("Run TDD based on the selected markdown file")
  .action(async () => await runTDD());

program.parse(process.argv);
