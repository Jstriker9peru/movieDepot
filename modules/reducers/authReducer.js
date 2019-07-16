import { createReducer } from "../utils/reducerUtil";
import { FETCH_USER, LOGOUT, FORM_ERROR } from "../actions/authConstants";

const initialState = {
  authenticated: false,
  currentUser: {},
  formError: null
};

const fetchUser = (state, payload) => {
  return {
    ...state,
    authenticated: true,
    currentUser: payload
  };
};

const logOut = state => {
  return {
    ...state,
    authenticated: false,
    currentUser: null
  };
};

const formError = (state, payload) => {
  return {
    ...state,
    formError: payload
  };
};

export default createReducer(initialState, {
  [FETCH_USER]: fetchUser,
  [LOGOUT]: logOut,
  [FORM_ERROR]: formError
});
