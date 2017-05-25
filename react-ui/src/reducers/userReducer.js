const initialState = {
  signupUsernameValue: '',
  signupPasswordValue: ''
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SIGNUP_USERNAME_CHANGE':
      return Object.assign({}, state, { signupUsernameValue: action.value });
    case 'SIGNUP_PASSWORD_CHANGE':
      return Object.assign({}, state, { signupPasswordValue: action.value });
    case 'SIGNUP':
      return Object.assign({}, state, {
        signupPasswordValue: '',
        signupUsernameValue: '',
        signupErrorMessage: '',
        isLoggedIn: true
      });
    case 'SIGNUP_FAILURE':
      return Object.assign({}, state, { signupErrorMessage: action.message });
    case 'LOGIN_USERNAME_CHANGE':
      return Object.assign({}, state, { loginUsernameValue: action.value });
    case 'LOGIN_PASSWORD_CHANGE':
      return Object.assign({}, state, { loginPasswordValue: action.value });
    case 'LOGIN': {
      return Object.assign({}, state, {
        loginUsernameValue: '',
        loginPasswordValue: '',
        isLoggedIn: true,
        loginErrorMessage: ''
      });
    }
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, { loginErrorMessage: action.message });
    case 'LOGOUT':
      return Object.assign({}, state, { isLoggedIn: false });

    default:
      return state;
  }
}
