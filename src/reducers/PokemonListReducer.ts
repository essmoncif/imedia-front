import { Action, Dispatch } from "redux"
import { ActionType } from "../actions/PokemonList"

export interface State {
    loading: boolean
    data? : []
    status?: string
}

const defaultSate : State = {
    loading: false,
    data: [],
    status: ""
}

export const GetPokemonListReducer = (state: State = defaultSate, action: any): State => {
    switch(action.type) {
        case ActionType.LOADING:
            return {
                loading: true
            }
        
        case ActionType.SUCCESS:
            return {
                loading: false,
                data: action.payload
            }
        case ActionType.FAILED:
            return {
                loading: false,
                status: "Unable to fetch data !"
            }
        
        default:
            return state
    }
}