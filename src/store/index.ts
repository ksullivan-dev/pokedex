import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import pokemonReducer from "./pokemon";

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
  },
});

export function setupStore() {
  return store;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
