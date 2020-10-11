import {SET_FILTERS, TOGGLE_FAVOURITE} from "../constants/mealConstants";


export const toggleFavourite = (id) => {
    return {type: TOGGLE_FAVOURITE, payload: {mealId: id}}

}

export const setFilters = (filters) => {
    return {type: SET_FILTERS, payload: {filters: filters}}

}