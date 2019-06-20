import { SIGN_IN_USER, SIGN_OUT_USER } from '../actions/authConstants';
import { createReducer } from '../utils/reducerUtil';

const initialState = {
    currentUser: {}
}

export const signInUser = (state, payload) => {
    return {
        ...state,
        authenticated: true,
        currentUser: payload.creds.email
    }
}

export const signOutUser = (state, payload) => {
    return {
        ...state,
        authenticated: false,
        currentUser: {}
    }
}

export default createReducer(initialState, {
    [SIGN_IN_USER]: signInUser,
    [SIGN_OUT_USER]: signOutUser
})