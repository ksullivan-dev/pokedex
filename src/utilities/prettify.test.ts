import { expect, it } from "vitest";
import { prettify } from "./prettify";

it("should remove undesirable characters", () => {
  const string = "test/one-two.three_four\\five";
  expect(prettify(string)).toBe("test one two three four five");
});
