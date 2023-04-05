import fs from "fs";

interface TestInput {
  input: number;
  output: string;
}

interface TestCase {
  [key: string]: {
    inputs: TestInput[];
  };
}

function parseTestCases(content: string): TestCase {
  const testCases: TestCase = {};

  const regex = /case\d+:\s"(.*?)".*?inputs:\s*\[(.*?)\]/gs;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const name = match[1];
    const inputString = `[${match[2]}]`;
    const inputs = JSON.parse(inputString.replace(/'/g, '"')) as TestInput[];
    testCases[name] = { inputs };
  }

  return testCases;
}

function buildTestCaseString(
  testCases: TestCase,
  functionName: string,
  importPath: string
): string {
  let output = `import { ${functionName} } from '${importPath}';\n\n`;

  for (const [name, { inputs }] of Object.entries(testCases)) {
    output += `describe('${name}', () => {\n`;
    for (const { input, output: expectedOutput } of inputs) {
      output += `  test('returns ${expectedOutput} for ${input}ms', () => {\n`;
      output += `    expect(${functionName}(${input})).toBe('${expectedOutput}');\n`;
      output += `  });\n`;
    }
    output += "});\n\n";
  }

  return output;
}

export function generateTestCases(
  filepath: string,
  outputFileBase: string,
  functionName: string,
  importPath: string
) {
  const fileContent = fs.readFileSync(filepath, "utf8");
  const testCases = parseTestCases(fileContent);
  const testCaseString = buildTestCaseString(
    testCases,
    functionName,
    importPath
  );

  const outputFileName = `${outputFileBase}.spec.ts`;
  fs.writeFileSync(outputFileName, testCaseString);
}
