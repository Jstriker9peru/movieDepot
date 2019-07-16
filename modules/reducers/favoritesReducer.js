import { createReducer } from "../utils/reducerUtil";
import { GET_FAVORITES } from "../actions/favoritesConstants";

const initialState = {
  favorites: []
};

const getFavorites = (state, payload) => {
  return {
    ...state,
    favorites: payload
  };
};

export default createReducer(initialState, {
  [GET_FAVORITES]: getFavorites
});
