import { createStore } from 'redux';
import combineReducers from './reducers/combineReducers.js';

import actions from './reducers/actions.js';


const store = createStore(combineReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = {
  store: store,
  actions: actions
}
