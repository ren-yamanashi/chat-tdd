## References

- Node.js documents: https://nodejs.org/docs
- OpenAI: https://openai.com

## package manager
yarn

## 開発手順

### 1. パッケージインストール
```bash
yarn install
```

### 2. Configファイルのセットアップ (`chatTdd.config.ts`)
```ts
// chatTdd.config.ts
// examples
export default {
  openaiApiKey: your OPENAI_API_KEY,
  testPackage: "vitest", // jest or vitest
  outputDir: "src/chatGPT/tdd/responses" // outputDirectory for chatGPT response(TestCode and ProgramCode)
};
```

### 3. ビルド
```bash
yarn build       # normal
yarn build:watch # tsc-watch
```

### 4. 実行

```bash
yarn start run-tdd `filepath`
# example: `yarn start run-tdd ./examples/prompts/test.md`
```


## ディレクトリ構成
```
src
├── __tests__       
├── bin.ts          // メインファイル このファイルが実行される
├── container.ts    // DIコンテナの定義ファイル
├── infrastructure  // 必要なモジュールの提供 これはinterfaceに依存しており、DIコンテナに登録される。`tddRunner`ディレクトリから呼び出されることはない
│   ├── apis
├── interfaces
├── tddRunner       // chat-tddの実態を構成するファイル このファイルでのみDIコンテナの呼び出し可能。`tddRunner`配下のディレクトリは部品。`index`ファイルは物(部品の合成)
│   ├── fileSystem
│   ├── generateCode
│   └── index.ts
└── utils           // ユーティリティ関数など
```

