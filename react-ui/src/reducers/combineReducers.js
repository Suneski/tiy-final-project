import { combineReducers } from 'redux';

import queriesReducer from './queriesReducer.js'
import userReducer from './userReducer.js'

export default combineReducers({
  queries: queriesReducer,
  user: userReducer
})
