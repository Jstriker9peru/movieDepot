import { createReducer } from '../utils/reducerUtil';
import { ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/favoritesConstants';

const initialState = {
    favorites: []
}

const addFavorite = (state, payload) => {
    let newArray = [...state.favorites, payload];
    return {...state, favorites: newArray};
}

const removeFavorite = (state, payload) => {
    let newFavorites = state.favorites.filter(movie => movie.id !== payload.id);
    return {...state, favorites: newFavorites};
}

export default createReducer(initialState, {
    [ADD_FAVORITE]: addFavorite,
    [REMOVE_FAVORITE]: removeFavorite
})