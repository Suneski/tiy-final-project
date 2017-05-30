import actions from './actions.js';

const initialState = {
  savedRestVisible: 'saved-visible',
  savedRandVisible: 'saved-rand-invisible',
  randomRestaurant: '',
};

const randomSavedReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_RANDOM:
      return Object.assign({}, state, {
        savedRestVisible: 'saved-invisible',
        savedRandVisible: 'saved-rand-visible',
        randomRestaurant: action.value });
    case actions.SHOW_SAVED:
      return Object.assign({}, state, {
        savedRestVisible: 'saved-visible',
        savedRandVisible: 'saved-rand-invisible',
        });
    default:
      return state;
  }
}

module.exports = randomSavedReducer;
