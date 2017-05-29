import React, { Component } from 'react';
import Api from './Api';
import { store } from './Store.js';
import './index.css';

class SignUp extends Component {

  handleUsernameChange(evt) {
    // console.log(evt.target.value);
    store.dispatch({ type: 'SIGNUP_USERNAME_CHANGE', value: evt.target.value });
  }

  handlePasswordChange(evt) {
    // console.log("this is what SHOULD be sent", evt.target.value);
    store.dispatch({ type: 'SIGNUP_PASSWORD_CHANGE', value: evt.target.value });
    // console.log(this.props)
  }

  handleSignUpClick() {
    if (this.props.user.signupUsernameValue === '' && this.props.user.signupPasswordValue === '') {
      alert("Please include a username and a password");
      return;
    }
    if (this.props.user.signupUsernameValue === '' && this.props.user.signupPasswordValue !== '') {
      alert("Please include a username");
      return;
    }
    if (this.props.user.signupUsernameValue !== '' && this.props.user.signupPasswordValue === '') {
      alert("Please include a password");
      return;
    }
    Api.handleSignUpClick(this.props.user.signupUsernameValue, this.props.user.signupPasswordValue, this.props.history);
  }


  render() {
    // console.log('SignUp rerender', this.props);

    let message;
    if (this.props.user.signupErrorMessage !== '') {
      message = <div className="error-message">{this.props.user.signupErrorMessage}</div>
    }

    return (
      <div className="sign-up">
        <h2 className="sign-up-title">Sign Up</h2>

        <div>
          <input
            type="text"
            value={this.props.user.signupUsernameValue}
            placeholder="username"
            className="signup-username-input"
            onChange={(evt) => this.handleUsernameChange(evt)}
          />
        </div>

        <div>
          <input
            type="password"
            value={this.props.user.signupPasswordValue}
            placeholder="password"
            className="signup-password-input"
            onChange={(evt) => this.handlePasswordChange(evt)}
          />
        </div>

        <button onClick={() => this.handleSignUpClick()}>SIGN UP</button>

        {message}

      </div>
    )
  }
}

module.exports = SignUp;
