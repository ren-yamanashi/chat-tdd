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
  try {
    const testCode = await generateAnswer(promptMarkdown);
    console.log("[TestCode]\n\n", testCode);

    return testCode;
  } catch (error: any) {
    // FIXME: throwやめる
    throw new Error(error);
  }
};
