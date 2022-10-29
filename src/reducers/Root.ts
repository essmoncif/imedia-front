import { combineReducers } from "redux";
import { GetPokemonListReducer } from "./PokemonListReducer";

export const RootReducer = combineReducers({
  PokemonList: GetPokemonListReducer
});