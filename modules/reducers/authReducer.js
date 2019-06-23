import { SIGN_IN_USER, SIGN_OUT_USER, FETCH_USER, LOGOUT, FORM_ERROR } from '../actions/authConstants';
import { createReducer } from '../utils/reducerUtil';

const initialState = {
    authenticated: false,
    currentUser: {},
    formError: null
};

// const signInUser = (state, payload) => {
//     return {
//         ...state,
//         authenticated: true,
//         currentUser: payload.creds.email
//     }
// }

//  const signOutUser = (state, payload) => {
//     return {
//         ...state,
//         authenticated: false,
//         currentUser: {}
//     }
// }

const fetchUser = (state, payload) => {
    return {
        ...state,
        authenticated: true,
        currentUser: payload
    }
}

const logOut = (state) => {
    return {
        ...state,
        authenticated: false,
        currentUser: null
    }
}

const formError = (state, payload) => {
    return {
        ...state,
        formError: payload
    }
}


export default createReducer(initialState, {
    // [SIGN_IN_USER]: signInUser,
    // [SIGN_OUT_USER]: signOutUser,
    [FETCH_USER]: fetchUser,
    [LOGOUT]: logOut,
    [FORM_ERROR]: formError

})