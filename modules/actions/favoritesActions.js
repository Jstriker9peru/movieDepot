import { ADD_FAVORITE, REMOVE_FAVORITE } from './favoritesConstants';

export const addFavorite = (movieInfo) => {
    return {
        type: ADD_FAVORITE,
        payload: movieInfo
    }
}

export const removeFavorite = (movieInfo) => {
    return {
        type: REMOVE_FAVORITE,
        payload: movieInfo
    }
}