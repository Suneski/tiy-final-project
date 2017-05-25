import React, { Component } from 'react';
import { store } from './Store.js';
import './style/User.css';

class Login extends Component {

  handleUsernameChange(evt) {
    console.log(evt.target.value);
    store.dispatch({ type: 'NEW_USERNAME', value: evt.target.value });
  }

  handlePasswordChange(evt) {
    console.log(evt.target.value);
    store.dispatch({ type: 'NEW_PASSWORD', value: evt.target.value });
  }

  handleSignUpClick() {
    console.log('test');
    // $.ajax({
    //   url: '/api/signup',
    //   method: 'POST',
    //   data: {
    //     username: this.props.signupUsernameValue,
    //     password: this.props.signupPasswordValue
    //   }
    // })
    // .done((data) => {
    //   store.dispatch({ type: actions.SIGNUP });
    //   //Success! Move them to the book list.
    //   this.props.history.push('/booklist');
    // })
    // .fail((xhr, error, responseText) => {
    //   store.dispatch({ type: actions.SIGNUP_FAILURE, message: xhr.responseText });
    // });
  }


  render() {

    // console.log('SignUp rerender', this.props);

    let message;
    if (this.props.signupErrorMessage !== '') {
      message = <div className="message bad-message">{this.props.signupErrorMessage}</div>
    }

    return (
      <div className="login">
        <h2 className="login-title">Login</h2>

        <div>
          <input
            type="text"
            placeholder="username"
            className="login-username-input"
            onChange={(evt) => this.handleUsernameChange(evt)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="password"
            className="login-password-input"
            onChange={(evt) => this.handlePasswordChange(evt)}
          />
        </div>

        <button onClick={() => this.handleSignUpClick()}>SIGN UP</button>

        {message}

      </div>
    )
  }
}

module.exports = Login;
