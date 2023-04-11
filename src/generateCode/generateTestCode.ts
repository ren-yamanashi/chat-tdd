import { result } from "../utils/result";

export const generateTestCode = async ({
  generateAnswer,
  refactoredCode,
  testPackage,
  markdownFileContent,
}: {
  generateAnswer: (prompt: string) => Promise<string>;
  refactoredCode: string;
  testPackage: string;
  markdownFileContent?: string;
}): Promise<string> => {
  // FIXME: プロンプトをよく考える
  const promptMarkdown = `以下のコードのテストコードを作成して下さい。\n
  プラットフォームはNode.jsをインストールしています。\n
  テストパッケージは${testPackage}をインストールしています。\n
  テストコードのみ出力してください。\n
  ${refactoredCode}\n
  また、テストケースには以下のマークダウンファイルの[TestCases]を参考にして下さい。\n
  ${markdownFileContent}
  `;

  const { data, error } = await result<string>(() =>
    generateAnswer(promptMarkdown)
  );
  console.log("[TestCode]\n\n", data);
  if (error) {
    console.error(error);
    process.exit(1);
  }
  if (!data) {
    console.log("TestCode is not defined.");
    process.exit(1);
  }

  return data;
};
