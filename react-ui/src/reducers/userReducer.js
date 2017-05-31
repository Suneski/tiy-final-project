import actions from './actions.js';

const initialState = {
  isLoggedIn: false,
  loginUsernameValue: '',
  loginPasswordValue: '',
  loginErrorMessage: '',
  signupUsernameValue: '',
  signupPasswordValue: '',
  signupErrorMessage: '',
  name: '',
  addButton: 'noAddButton',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNUP_USERNAME_CHANGE:
      return Object.assign({}, state, {
        signupUsernameValue: action.value,
        name: action.value });
    case actions.SIGNUP_PASSWORD_CHANGE:
      return Object.assign({}, state, { signupPasswordValue: action.value });
    case actions.SIGNUP:
      return Object.assign({}, state, {
        signupPasswordValue: '',
        signupUsernameValue: '',
        signupErrorMessage: '',
        isLoggedIn: true,
        addButton: 'addButton' });
    case actions.SIGNUP_FAILURE:
      return Object.assign({}, state, { signupErrorMessage: action.message });
    case actions.LOGIN_USERNAME_CHANGE:
      return Object.assign({}, state, {
        loginUsernameValue: action.value,
        name: action.value });
    case actions.LOGIN_PASSWORD_CHANGE:
      return Object.assign({}, state, { loginPasswordValue: action.value });
    case actions.LOGIN: {
      return Object.assign({}, state, {
        loginUsernameValue: '',
        loginPasswordValue: '',
        isLoggedIn: true,
        loginErrorMessage: '',
        addButton: 'addButton',
      });
    }
    case actions.LOGIN_FAILURE:
      return Object.assign({}, state, { loginErrorMessage: action.message });
    case actions.LOGOUT:
      return Object.assign({}, state, { isLoggedIn: false });

    default:
      return state;
  }
}

module.exports = userReducer;
