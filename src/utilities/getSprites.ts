import type { PokemonSprites } from "pokenode-ts";

export const getSprites = (
  sprites: PokemonSprites,
  getNestedSprites = false,
  hashkey = ""
) => {
  const spritesArray = Object.entries(sprites);
  let spriteHash: { [key: string]: string } = {};
  for (let i = 0; i < spritesArray.length; i++) {
    const [key, value] = spritesArray[i];
    let _key = hashkey + key;

    if (value === null) {
      continue;
    }

    // Bailing out early if the key already exists
    if (Object.hasOwn(spriteHash, _key)) {
      continue;
    }

    // Allow recursion - leaving this in but not using it
    if (typeof value === "object" && value !== null) {
      if (getNestedSprites) {
        const inner = getSprites(value, true, _key + "/");
        spriteHash = { ...spriteHash, ...inner };
      }
      continue;
    }

    spriteHash[_key] = value;
  }
  return spriteHash;
};
