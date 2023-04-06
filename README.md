## References

- Node.Js documents: https://nodejs.org/docs
- chatGPT: https://openai.com

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
