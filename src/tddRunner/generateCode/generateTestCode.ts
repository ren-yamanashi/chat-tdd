import { safeExecute } from "../../utils/safeExecute";

export const generateTestCode = async ({
  generateAnswer,
  refactoredCode,
  testPackage,
  markdownFileContent,
}: {
  generateAnswer: (prompt: string) => Promise<string | Error>;
  refactoredCode: string;
  testPackage: string;
  markdownFileContent?: string;
}): Promise<string> => {
  // TODO: プロンプトをよく考える
  const promptMarkdown = `以下のコードのテストコードを作成して下さい。\n
  プラットフォームはNode.jsをインストールしています。\n
  テストパッケージは${testPackage}をインストールしています。\n
  テストコードのみ出力してください。\n
  ${refactoredCode}\n
  また、テストケースには以下のマークダウンファイルの[TestCases]を参考にして下さい。\n
  ${markdownFileContent}
  `;

  const { response, error } = await safeExecute<string | Error>(() =>
    generateAnswer(promptMarkdown)
  );

  console.log("[TestCode]\n\n", response);

  if (!response) {
    console.error("TestCode is not defined.");
    process.exit(1);
  }
  if (response instanceof Error) {
    console.error(response);
    process.exit(1);
  }
  if (error) {
    console.error(error);
    process.exit(1);
  }

  return response;
};
