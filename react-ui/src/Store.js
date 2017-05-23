import { createStore } from 'redux';

var initialState = {
  restaurantNameQuery: '',
  locationQuery: '',
  resultsPerPage: '',
  sortResults: '',
  inputValue: '',
  searchResults: [],
  addButton: 'addButton',
  loaderClass: 'deactivated',
  resultVisibility: 'resultsVisible'
};

const reducer = (state = initialState, action) => {
  // console.log('reducer running check', action);

  switch (action.type) {
    case 'LOADING_CALL':
      return Object.assign({}, state, {
        loaderClass: 'activated',
        resultVisibility: 'resultsNotVisible'
      })
    case 'LOADING_COMPLETE':
      return Object.assign({}, state, {
        searchResults: action.value,
        loaderClass: 'deactivated',
        resultVisibility: 'resultsVisible'
      })
    default: return state
  }
}

const store = createStore(reducer);

module.exports = {
  store: store
}
