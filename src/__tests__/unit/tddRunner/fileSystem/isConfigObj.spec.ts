import { isConfigObj } from "src/tddRunner/fileSystem/readConfigFile";

describe("isConfigObj", () => {
  it("should return true for valid config objects", () => {
    const validConfig = {
      testPackage: "vitest",
      outputDir: "examples/responses",
    };

    expect(isConfigObj(validConfig)).toBe(true);
  });

  test("should return false for invalid config objects", () => {
    const invalidConfigs = [
      {},
      { testPackage: "vitest" },
      { outputDir: "examples/responses" },
      { testPackage: "vitest", outputDir: 123 },
      { testPackage: 123, outputDir: "examples/responses" },
      null,
      undefined,
    ];

    invalidConfigs.forEach((config) => {
      expect(isConfigObj(config)).toBe(false);
    });
  });
});