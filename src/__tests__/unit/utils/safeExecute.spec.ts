import { safeExecute } from "src/utils/safeExecute";

describe("safeExecute", () => {
  it("should return response when asyncFunc resolves", async () => {
    const asyncFunc = async () => "Hello, world!";
    const result = await safeExecute(asyncFunc);

    expect(result).toEqual({ response: "Hello, world!" });
  });

  it("should return error when asyncFunc rejects", async () => {
    const asyncFunc = async () => {
      throw new Error("Oops, something went wrong!");
    };
    const result = await safeExecute(asyncFunc);

    expect(result).toMatchObject({
      error: new Error("Oops, something went wrong!"),
    });
  });
});
