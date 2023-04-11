// yamlかjsonにする`.ts`だとコンパイルできない
// CommonJSに変更する

export default {
  openaiApiKey: process.env.OPENAI_API_KEY,
  testPackage: "vitest",
  outputDir: "examples/responses"
};
