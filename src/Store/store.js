// import logger from 'redux-logger';
import combinedReducer from '../Reducers/combinedReducer';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const composeEnhancers = composeWithDevTools({});
const middleware = [];
// const middleware = [logger];

let store = createStore(combinedReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;