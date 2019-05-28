import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from '../reducers/rootReducer';

const exampleInitialState = {
    signedIn: false
}

export const initStore = (initialState = exampleInitialState) => {
    return createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
};