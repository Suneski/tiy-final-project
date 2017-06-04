import actions from './actions.js';

const initialState = {
  restaurantNameQuery: '',
  searchErrorMessage: '',
  locationQuery: '',
  resultsPerPage: 20,
  sortResults: '',
  sortPrice: '',
  inputValue: '',
  totalResults: '',
  offset: 0,
  pageCount: 0,
  page: 1,
  pageView: 'page-view-invisible',
  previousButtonVisible: 'previous-button-invisible',
  nextButtonVisible: 'next-button-visible',
  searchResults: [],
  savedRestaurants: [],
  resultsList: 'search-results',
  loaderClass: 'deactivated',
  notes: '',
  textAreaDefault: ''
};

// return Object.assign({}, initialState);

const queriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESTAURANT_SEARCH:
      return Object.assign({}, state, {
        restaurantNameQuery: action.value });
    case actions.SHOW_PAGE_VIEW:
      return Object.assign({}, state, {
        pageView: 'page-view-visible' });
    case actions.TOTAL_RESULTS:
      return Object.assign({}, state, {
        totalResults: action.value });
    case actions.TOTAL_PAGES:
      return Object.assign({}, state, {
        pageCount: action.value });
    case actions.RESET_PAGE:
      return Object.assign({}, state, {
        offset: 0,
        pageCount: 1,
        page: 1 });



    case actions.PREVIOUS_PAGE:
      return Object.assign({}, state, {
        offset: action.value,
        page: action.pageSubtract });
    case actions.PREVIOUS_BUTTON_VISIBLE:
      return Object.assign({}, state, {
        previousButtonVisible: 'previous-button-visible' });
    case actions.PREVIOUS_BUTTON_INVISIBLE:
      return Object.assign({}, state, {
        previousButtonVisible: 'previous-button-invisible' });





    case actions.NEXT_PAGE:
      return Object.assign({}, state, {
        offset: action.value,
        page: action.pageAdd });


    case actions.NEXT_BUTTON_VISIBLE:
      return Object.assign({}, state, {
        nextButtonVisible: 'next-button-visible' });
    case actions.NEXT_BUTTON_INVISIBLE:
      return Object.assign({}, state, {
        nextButtonVisible: 'next-button-invisible' });






    case actions.SEARCH_FAILURE:
      return Object.assign({}, state, {
        searchErrorMessage: action.message,
        loaderClass: 'deactivated',
        resultsList: 'search-results-hidden' });
    case actions.LOCATION_SEARCH:
      return Object.assign({}, state, { locationQuery: action.value });




    case actions.RESULTS_TOTAL:
      return Object.assign({}, state, {
        resultsPerPage: action.value,
        page: action.page,
        offset: 0 });
    case actions.SORT_RESULTS:
      return Object.assign({}, state, {
        sortResults: action.value,
        page: action.page,
        offset: 0 });
    case actions.SORT_PRICE:
      return Object.assign({}, state, {
        sortPrice: action.value,
        page: action.page,
        offset: 0 });




    case actions.SAVED_RESTAURANTS_CB:
      return Object.assign({}, state, { savedRestaurants: action.value });


    case actions.VERIFY_LOGOUT:
      return Object.assign({}, initialState);

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




    case actions.SUBMIT_NOTE:
      return Object.assign({}, state, {
        notes: action.value ,
        textAreaDefault: '' });





    default:
      return state;
  }
}

module.exports = queriesReducer;
