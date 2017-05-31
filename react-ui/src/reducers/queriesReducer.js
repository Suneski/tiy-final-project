import actions from './actions.js';

const initialState = {
  restaurantNameQuery: '',
  searchErrorMessage: '',
  locationQuery: '',
  resultsPerPage: '',
  sortResults: '',
  sortPrice: '',
  inputValue: '',
  searchResults: [],
  savedRestaurants: [],
  resultsList: 'search-results',
  loaderClass: 'deactivated',
  notes: '',
};

const queriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESTAURANT_SEARCH:
      return Object.assign({}, state, {
        restaurantNameQuery: action.value });
    case actions.SEARCH_FAILURE:
      return Object.assign({}, state, {
        searchErrorMessage: action.message,
        loaderClass: 'deactivated',
        resultsList: 'search-results-hidden' });
    case actions.LOCATION_SEARCH:
      return Object.assign({}, state, { locationQuery: action.value });
    case actions.RESULTS_TOTAL:
      return Object.assign({}, state, { resultsPerPage: action.value });
    case actions.SORT_RESULTS:
      return Object.assign({}, state, { sortResults: action.value });
    case actions.SORT_PRICE:
      return Object.assign({}, state, { sortPrice: action.value });
    case actions.SAVED_RESTAURANTS_CB:
      return Object.assign({}, state, { savedRestaurants: action.value });
    case actions.NOTES_EDIT:
      return Object.assign({}, state, { notes: action.value });
    // case actions.SUBMIT_NOTE:
    //   return Object.assign({}, state, { notes: '' });
    case actions.LOADING:
      return Object.assign({}, state, {
        loaderClass: 'activated',
        resultsList: 'search-results-hidden',
        searchErrorMessage: '' });
    case actions.DONE_LOADING:
      return Object.assign({}, state, {
        searchResults: action.value,
        resultsList: 'search-results',
        loaderClass: 'deactivated' });
    default:
      return state;
  }
}

module.exports = queriesReducer;
