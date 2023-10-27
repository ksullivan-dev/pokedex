import { expect, it } from "vitest";
import { getSprites } from "./getSprites";
import data from "../../tests/fixtures/pokemon/pikachu.json";

it("should get the basic sprites", () => {
  const spritesHash = getSprites(data.sprites);

  expect(Object.keys(spritesHash)).toHaveLength(8);
  expect(spritesHash["back_default"]).toBe(data.sprites.back_default);
});

it("should only get sprites with values", () => {
  const spriteHash = getSprites({ ...data.sprites, back_default: null });

  expect(Object.keys(spriteHash)).toHaveLength(7);
  expect(spriteHash["back_default"]).toBeUndefined();
});

it("should get all of the sprites", () => {
  const spriteHash = getSprites(data.sprites, true);

  expect(Object.keys(spriteHash)).toHaveLength(110);
  expect(spriteHash["other/home/front_default"]).toBe(
    data.sprites.other.home.front_default
  );
});
