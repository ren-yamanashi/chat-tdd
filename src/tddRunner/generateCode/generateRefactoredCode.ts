import { safeExecute } from "../../utils/safeExecute";

/**
 * ユーザーが指定するまでリファクタリングを繰り返す
 */
export const runRefactoringLoop = async ({
  question,
  generateAnswer,
  programCode,
  load,
}: {
  question: (query: string) => Promise<string>;
  generateAnswer: (prompt: string) => Promise<string | Error>;
  programCode: string;
  load?: <T>(asyncFunc: () => Promise<T>) => Promise<T>;
}): Promise<string> => {
  while (true) {
    const { response } = await safeExecute(() =>
      question("Do you want to refactor? (y/N)")
    );
    if (response?.toLocaleLowerCase() !== "y") break;

    const { response: refactoringMethod } = await safeExecute(() =>
      question("How would you like to refactor the code? ")
    );

    if (!refactoringMethod?.length) {
      console.error("Refactoring method cannot be empty");
      break;
    }

    const refactoringPrompt = `以下のコードを要件に合うようにリファクタリングしてください。\n\n${programCode}\n[要件]: ${refactoringMethod}`;

    await safeExecute(() =>
      load
        ? load<string | Error>(() => generateAnswer(refactoringPrompt))
        : generateAnswer(refactoringPrompt)
    ).then(({ response, error }) => {
      if (!response) {
        console.error("programCode is not defined");
        process.exit(1);
      }
      if (response instanceof Error) {
        console.error(error);
        process.exit(1);
      }
      if (error) {
        console.error(error);
        process.exit(1);
      }
      programCode = response;
      console.log("[Refactored Code]\n", programCode);
    });
  }

  return programCode;
};
