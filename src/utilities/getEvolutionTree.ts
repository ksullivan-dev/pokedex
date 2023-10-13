import type { ChainLink } from "pokenode-ts";

export const getEvolutionTree = (chainLink: ChainLink) => {
  let tree = [chainLink.species] as { name: string; url: string }[];

  if (chainLink.evolves_to.length) {
    for (let i = 0; i < chainLink.evolves_to.length; i++) {
      const chain = chainLink.evolves_to[i];
      const inner = getEvolutionTree(chain);

      tree = [...tree, ...inner];
    }
  }

  return tree;
};
