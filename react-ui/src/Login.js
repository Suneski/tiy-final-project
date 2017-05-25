import React, { Component } from 'react';
import $ from 'jquery';
import { store } from './Store.js';
import './style/User.css';

class Login extends Component {

  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsub();
  }

  handleUsernameChange(evt) {
    store.dispatch({ type: 'LOGIN_USERNAME_CHANGE', value: evt.target.value })
  }

  handlePasswordChange(evt) {
    store.dispatch({ type: 'LOGIN_PASSWORD_CHANGE', value: evt.target.value })
  }

  handleLoginClick() {
    console.log('pending')
    // $.ajax({
    //   url: '/api/login',
    //   method: 'POST',
    //   data: {
    //     username: this.state.loginUsernameValue,
    //     password: this.state.loginPasswordValue
    //   }
    // })
    // .done((data) => {
    //   store.dispatch({ type: actions.LOGIN });
    //   //Success! Move them to the book list.
    //   this.props.history.push('/booklist');
    // })
    // .fail((xhr) => {
    //   store.dispatch({ type: actions.LOGIN_FAILURE, message: 'I am sorry, but I do not know who you are.' });
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

        <button onClick={() => this.handleLoginClick()}>SIGN UP</button>

        {message}

      </div>
    )
  }
}

module.exports = Login;
