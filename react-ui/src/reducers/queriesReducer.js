import actions from './actions.js';

const initialState = {
  restaurantNameQuery: '',
  locationQuery: '',
  resultsPerPage: '',
  sortResults: '',
  inputValue: '',
  searchResults: [],
  savedRestaurants: [],
  addButton: 'addButton',
  loaderClass: 'deactivated',
  resultVisibility: 'resultsVisible'
};

const queriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESTAURANT_SEARCH:
      return Object.assign({}, state, { restaurantNameQuery: action.value });
    case actions.LOCATION_SEARCH:
      return Object.assign({}, state, { locationQuery: action.value });
    case actions.RESULTS_TOTAL:
      return Object.assign({}, state, { resultsPerPage: action.value });
    case actions.SORT_RESULTS:
      return Object.assign({}, state, { sortResults: action.value });
    case actions.SAVED_RESTAURANTS_CB:
      return Object.assign({}, state, { savedRestaurants: action.value });
    case actions.LOADING:
      return Object.assign({}, state, {
        loaderClass: 'activated',
        resultVisibility: 'resultsNotVisible'} )
    case actions.DONE_LOADING:
      return Object.assign({}, state, {
        searchResults: action.value,
        loaderClass: 'deactivated',
        resultVisibility: 'resultsVisible'} )
    // case 'ADD_RESTAURANT':
    //   return Object.assign({}, state, {
    //     addButton: 'addButtonSelected',
    //     favorited: 'favorited'} )
    // case 'REMOVE_CHECKMARK':
    //   return Object.assign({}, state, {
    //     addButton: 'addButton',
    //     favorited: 'favoritedSelected'
    // })

    default:
      return state;
  }
}

module.exports = queriesReducer;
