import { createReducer } from '../utils/reducerUtil';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/countConstants';

const initialState = {
    data: 10
}

const incrementCounter = (state, payload) => {
    return {...state, data: state.data + 1};
}

const decrementCounter = (state, payload) => {
    return {...state, data: state.data - 1};
}

export default createReducer(initialState, {
    [INCREMENT_COUNTER]: incrementCounter,
    [DECREMENT_COUNTER]: decrementCounter
})