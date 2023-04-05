import { chatGPT } from "../plugins/chatGPT";

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
