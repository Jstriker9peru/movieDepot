import { combineReducers } from 'redux';
import countReducer from './countReducer';
import favoritesReducer from './favoritesReducer';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import modalReducer from './modalReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    fakeData: countReducer,
    favoritesData: favoritesReducer,
    form: formReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    modal: modalReducer,
    auth: authReducer
})

export default rootReducer;