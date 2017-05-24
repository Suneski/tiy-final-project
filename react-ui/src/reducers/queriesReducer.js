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

export default function queriesReducer(state = initialState, action) {
  switch (action.type) {
    case 'RESTAURANT_SEARCH':
      return Object.assign({}, state, { restaurantNameQuery: action.value });
    case 'LOCATION_SEARCH':
      return Object.assign({}, state, { locationQuery: action.value });
    case 'RESULTS_TOTAL':
      return Object.assign({}, state, { resultsPerPage: action.value });
    case 'SORT_RESULTS':
      return Object.assign({}, state, { sortResults: action.value });
    case 'LOADING':
      return Object.assign({}, state, {
        loaderClass: 'activated',
        resultVisibility: 'resultsNotVisible'} )
    case 'DONE_LOADING':
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
