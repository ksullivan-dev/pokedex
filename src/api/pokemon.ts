import { AxiosError } from "axios";
import { PokemonClient, EvolutionClient } from "pokenode-ts";
import type { Pokemon, EvolutionChain } from "pokenode-ts";

const api = new PokemonClient();
const evolutionApi = new EvolutionClient();

export const getPokemon = async (name: string) => {
  let data, error;
  const search = name.toLowerCase();
  try {
    const [response, evolution] = await Promise.all([
      api.getPokemonByName(search),
      getEvolutionDetails(search),
    ]);
    data = { ...response, evolution } as Pokemon & {
      evolution: EvolutionChain;
    };
  } catch (e) {
    const err = e as AxiosError;

    if (err?.response?.status === 404) {
      error = "No Pokemon found. Check the spelling and try again.";
    } else {
      error = "Something unexpected happened";
    }
  }

  return { data, error };
};

const getEvolutionDetails = async (name: string) => {
  const data = await api.getPokemonSpeciesByName(name);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unused, id] = data.evolution_chain.url.split("evolution-chain/");
  return await evolutionApi.getEvolutionChainById(parseInt(id));
};
