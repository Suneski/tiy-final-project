const initialState = {
  signupUsernameValue: '',
  signupPasswordValue: ''
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'NEW_USERNAME':
      return Object.assign({}, state, { signupUsernameValue: action.value });
    case 'NEW_PASSWORD':
      return Object.assign({}, state, { signupPasswordValue: action.value });
    default:
      return state;
  }
}
