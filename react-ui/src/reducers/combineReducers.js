import { combineReducers } from 'redux';

import queriesReducer from './queriesReducer.js'
import userReducer from './userReducer.js'
import randomSavedReducer from './randomSavedReducer.js'

export default combineReducers({
  queries: queriesReducer,
  user: userReducer,
  randomSaved: randomSavedReducer,
})
