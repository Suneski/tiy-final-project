import { createStore } from 'redux';

const initialState = {
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
    case 'RESTAURANT_SEARCH':
      return Object.assign({}, state, { restaurantNameQuery: action.value });
    case 'LOCATION_SEARCH':
      return Object.assign({}, state, { locationQuery: action.value });
    // case 'LOADING_CALL':
    //   return Object.assign({}, state, {
    //     loaderClass: 'activated',
    //     resultVisibility: 'resultsNotVisible'
    //   })
    // case 'LOADING_COMPLETE':
    //   return Object.assign({}, state, {
    //     searchResults: action.value,
    //     loaderClass: 'deactivated',
    //     resultVisibility: 'resultsVisible'
    //   })




    default:
      return state;
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = {
  store: store
}
