import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import modalReducer from './modalReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    favoritesData: favoritesReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: formReducer,
    modal: modalReducer,
})

export default rootReducer;