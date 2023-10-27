import { expect, it } from "vitest";
import { capitalize } from "./capitalize";

it("should capitalize the first letter", () => {
  expect(capitalize("test")).toBe("Test");
  expect(capitalize("tEst")).toBe("Test");
  expect(capitalize("tEst tEST")).toBe("Test test");
});

it("should capitalize all words", () => {
  expect(capitalize("test test", true)).toBe("Test Test");
});
