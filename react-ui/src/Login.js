import React, { Component } from 'react';
import Api from './Api.js';
import './index.css';
import { store } from './Store.js';


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

    if (this.state.user.loginUsernameValue === '' && this.state.user.loginPasswordValue === '') {
      alert("Please include a username and a password");
      return;
    }
    if (this.state.user.loginUsernameValue === '' && this.state.user.loginPasswordValue !== '') {
      alert("Please include a username");
      return;
    }
    if (this.state.user.loginUsernameValue !== '' && this.state.user.loginPasswordValue === '') {
      alert("Please include a password");
      return;
    }

    Api.handleLoginClick(this.state.user.loginUsernameValue, this.state.user.loginPasswordValue, this.props.history);
  }

  render() {

    let message;
    if (this.state.user.loginErrorMessage !== '') {
      message = <div className="error-message">{this.state.user.loginErrorMessage}</div>
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
