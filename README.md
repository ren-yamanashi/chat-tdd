## References

- Node.js documents: https://nodejs.org/docs
- OpenAI: https://openai.com

## package manager

yarn

## 📚 Development procedure

1. Install package

```bash
yarn install
```

2. Stat up (Either of the following)

```bash
yarn build       # normal
yarn build:watch # tsc-watch
```

3. Setup `chatTdd.config.ts`

```ts
// examples
export default {
  openaiApiKey: your OPENAI_API_KEY,
  testPackage: "vitest", // jest or vitest
  outputDir: "src/chatGPT/tdd/responses" // outputDirectory for chatGPT response(TestCode and ProgramCode)
};
```

4. execution Command

```bash
yarn start run-tdd < your prompt filePath >
```

5. ディレクトリ構成

```
src
├── application     // 複数のサブシステムを統合し、クライアントに対して単純化されたインターフェースを提供   (物として機能)
├── fileSystem      // ファイル関連の機能を持つ 部品として機能
├── generateCode    // コードを生成する機能を持つ 部品として機能
├── infrastructure 
│   └── apis
├── interface
└── utils           // 汎用的なコード utilsディレクトリは以下のファイルは、必ず機能ごとに分かれる
```
