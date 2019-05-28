import { combineReducers } from 'redux';
import countReducer from './countReducer';

const rootReducer = combineReducers({
    fakeData: countReducer
})

export default rootReducer;