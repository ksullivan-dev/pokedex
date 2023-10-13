import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPokemon } from "../api/pokemon";

import type { EvolutionChain, Pokemon } from "pokenode-ts";

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (name: string) => {
    const response = await getPokemon(name);
    if (response.error) {
      throw response.error;
    }
    return response;
  }
);

const initialState: (Pokemon & { evolution: EvolutionChain })[] = [];

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        if (!!action.payload.data) {
          // removing the new one if it exists
          const updated = state.filter(
            (item) => item.name !== action.payload.data?.name
          );
          return [action.payload.data, ...updated];
        }
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        window.alert(action.error.message);
      });
  },
});

export default pokemonSlice.reducer;
