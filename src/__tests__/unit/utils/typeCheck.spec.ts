import { isIncludeMessage } from "src/utils/typeCheck";

describe("isIncludeMessage", () => {
  it('returns true when the object has a "message" key with a string value', () => {
    const obj = { message: "Hello, World!" };
    expect(isIncludeMessage(obj)).toBe(true);
  });

  it('returns false when the object does not have a "message" key', () => {
    const obj = { notMessage: "Hello, World!" };
    expect(isIncludeMessage(obj)).toBe(false);
  });

  it('returns false when the "message" key has a non-string value', () => {
    const obj = { message: 42 };
    expect(isIncludeMessage(obj)).toBe(false);
  });

  it("returns false when the argument is null", () => {
    const obj = null;
    expect(isIncludeMessage(obj)).toBe(false);
  });

  it("returns false when the argument is not an object", () => {
    const nonObjectValues = [42, "Hello, World!", true, undefined];
    nonObjectValues.forEach((value) => {
      expect(isIncludeMessage(value)).toBe(false);
    });
  });
});
