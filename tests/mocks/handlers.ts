import { rest } from "msw";

import pikachu from "../fixtures/pokemon/pikachu.json";
import raichu from "../fixtures/pokemon/raichu.json";
import pichu from "../fixtures/pokemon/pichu.json";
import species from "../fixtures/species.json";
import evolution from "../fixtures/evolution-chain.json";

export const handlers = [
  // Pokemons
  rest.get("https://pokeapi.co/api/v2/pokemon/pikachu", (req, res, ctx) => {
    return res(ctx.json(pikachu));
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/raichu", (req, res, ctx) => {
    return res(ctx.json(raichu));
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/pichu", (req, res, ctx) => {
    return res(ctx.json(pichu));
  }),

  // Species
  rest.get("https://pokeapi.co/api/v2/pokemon-species/*", (req, res, ctx) => {
    return res(ctx.json(species));
  }),

  // evolution chain
  rest.get("https://pokeapi.co/api/v2/evolution-chain/10", (req, res, ctx) => {
    return res(ctx.json(evolution));
  }),
];
