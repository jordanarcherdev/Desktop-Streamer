import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'
import reducers from './reducers';

//Implement redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Create the store
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

export default store;
