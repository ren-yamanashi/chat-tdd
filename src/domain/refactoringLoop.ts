import inquirer from "inquirer";
import { chatGPT } from "../plugins/chatGPT";

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
