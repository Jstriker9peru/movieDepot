import { combineReducers } from 'redux';
import countReducer from './countReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
    fakeData: countReducer,
    favoritesData: favoritesReducer
})

export default rootReducer;