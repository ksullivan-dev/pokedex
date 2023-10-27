import { expect, it } from "vitest";
import { getEvolutionTree } from "./getEvolutionTree";
import data from "../../tests/fixtures/evolution-chain.json";

it("should render the correct tree", () => {
  // @ts-expect-error
  const tree = getEvolutionTree(data.chain);
  expect(tree).toHaveLength(3);
  expect(tree[0]).toHaveProperty("name", "pichu");
  expect(tree[1]).toHaveProperty("name", "pikachu");
  expect(tree[2]).toHaveProperty("name", "raichu");
});
