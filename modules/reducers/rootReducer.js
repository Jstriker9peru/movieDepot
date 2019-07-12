import { combineReducers } from 'redux';
import countReducer from './countReducer';
import favoritesReducer from './favoritesReducer';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import modalReducer from './modalReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    favoritesData: favoritesReducer,
    form: formReducer,
    modal: modalReducer,
    auth: authReducer
})

export default rootReducer;