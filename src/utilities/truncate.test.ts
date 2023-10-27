import { expect, it } from "vitest";
import { truncate } from "./truncate";

it("should truncate the array", () => {
  const array = Array.from({ length: 100 }).map((_, idx) => ({
    id: idx + 1,
    name: idx.toString(),
  }));

  const defaultLimit = truncate(array);
  const withLimit = truncate(array, 4);

  expect(defaultLimit).toHaveProperty("rest", 90);
  expect(defaultLimit.values).toHaveLength(10);
  expect(defaultLimit.values[1]).toEqual({ id: 2, name: "1" });

  expect(withLimit).toHaveProperty("rest", 96);
  expect(withLimit.values).toHaveLength(4);
});
