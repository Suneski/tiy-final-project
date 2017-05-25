import React, { Component } from 'react';
import $ from 'jquery';
import { store } from './Store.js';
import './style/User.css';

class SignUp extends Component {

  handleUsernameChange(evt) {
    console.log(evt.target.value);
    store.dispatch({ type: 'SIGNUP_USERNAME_CHANGE', value: evt.target.value });
  }

  handlePasswordChange(evt) {
    console.log(evt.target.value);
    store.dispatch({ type: 'SIGNUP_PASSWORD_CHANGE', value: evt.target.value });
  }

  handleSignUpClick() {
    console.log('test');
    $.ajax({
      url: '/api/signup',
      method: 'POST',
      data: {
        username: this.props.signupUsernameValue,
        password: this.props.signupPasswordValue
      }
    })
    .done((data) => {
      store.dispatch({ type: 'SIGNUP' });
      //Success! Move them to the book list.
      this.props.history.push('/booklist');
    })
    .fail((xhr, error, responseText) => {
      store.dispatch({ type: 'SIGNUP_FAILURE', message: xhr.responseText });
    });
  }


  render() {

    // console.log('SignUp rerender', this.props);

    let message;
    if (this.props.signupErrorMessage !== '') {
      message = <div className="message bad-message">{this.props.signupErrorMessage}</div>
    }

    return (
      <div className="sign-up">
        <h2 className="sign-up-title">Sign Up</h2>

        <div>
          <input
            type="text"
            placeholder="username"
            className="signup-username-input"
            onChange={(evt) => this.handleUsernameChange(evt)}
          />
        </div>

        <div>
          <input
            type="text"
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
