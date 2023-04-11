export const runRefactoringLoop = async ({
  question,
  generateAnswer,
  chatGPTResponse,
  startLoad,
  stopLoad,
}: {
  question: (query: string) => Promise<string>;
  generateAnswer: (prompt: string) => Promise<string>;
  chatGPTResponse: string;
  startLoad: () => NodeJS.Timer;
  stopLoad: (loading: NodeJS.Timer) => void;
}): Promise<string> => {
  try {
    while (true) {
      const refactor =  await question("Do you want to refactor? (y/N)");
      if (refactor.toLocaleLowerCase() !== "y") break;

      const refactoringMethod = await question(
        "How would you like to refactor the code? "
      );
      if (refactoringMethod.length === 0) {
        console.log("Refactoring method cannot be empty");
        continue;
      }

      const refactoringPrompt = `以下のコードを要件に合うようにリファクタリングしてください。\n\n${chatGPTResponse}\n[要件]: ${refactoringMethod}`;

      const load = startLoad();
      chatGPTResponse = await generateAnswer(refactoringPrompt);
      stopLoad(load);

      console.log("[Refactored Code]\n", chatGPTResponse);
    }

    return chatGPTResponse;
  } catch (error: any) {
    // FIXME: throwやめる
    throw new Error(error);
  }
};
