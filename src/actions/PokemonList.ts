import { Dispatch } from "redux"
import { GetPokemonList } from "../services/PokeService"

export enum ActionType {
    LOADING = "LOADING_DATA",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export const getPokemonListAction = (page: number) => async(dispatch: Dispatch<any>) => {
    try {
        dispatch({
            type: "LOADING_DATA"
        })

        const result = await GetPokemonList(page)
        result ? dispatch({
            type: "SUCCESS",
            payload: result
        }) : dispatch({
            type: "FAILED"
        })
        
    } catch (error) {
        dispatch({
            type: "FAILED"
        })
    }
}