import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Command } from "commander";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();
program.version("0.0.1");

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
