import { combineReducers } from 'redux';

import queriesReducer from './queriesReducer.js'

export default combineReducers({
  queries: queriesReducer,
})
