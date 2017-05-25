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
    store.dispatch({ type: 'LOGIN_PASSWORD_CHANGE', value: evt.target.value });
  }

  handleLoginClick() {
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: {
        username: this.state.user.loginUsernameValue,
        password: this.state.user.loginPasswordValue
      }
    })
    .done((data) => {
      store.dispatch({ type: 'LOGIN' });
      //Success! Move them to the book list.
      this.props.history.push('/');
    })
    .fail((xhr) => {
      store.dispatch({ type: 'LOGIN_FAILURE', message: 'I am sorry, but I do not know who you are.' });
    });
  }

  render() {

    console.log('Login rerender', this.state);

    let message;
    if (this.state.user.loginErrorMessage !== '') {
      message = <div className="message bad-message">{this.state.user.loginErrorMessage}</div>
    }

    return (
      <div className="login">
        <h2 className="login-title">Login</h2>

        <div>
          <input
            type="text"
            value={this.state.user.loginUsernameValue}
            placeholder="username"
            className="login-username-input"
            onChange={(evt) => this.handleUsernameChange(evt)}
          />
        </div>

        <div>
          <input
            type="password"
            value={this.state.user.loginPasswordValue}
            placeholder="password"
            className="login-password-input"
            onChange={(evt) => this.handlePasswordChange(evt)}
          />
        </div>

        <button onClick={() => this.handleLoginClick()}>LOG IN</button>

        {message}

      </div>
    )
  }
}

module.exports = Login;
