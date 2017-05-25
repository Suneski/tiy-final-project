import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { store } from './Store.js';
import $ from 'jquery';

class Navigation extends React.Component {

  handleLogout() {
    $.ajax({
      url: '/api/logout',
      method: 'POST'
    })
    .done(() => {
      store.dispatch({ type: 'LOGOUT' });
      this.props.history.push('/login');
    });

  }

  render() {
    let loginStateComponent;
    if (this.props.isLoggedIn) {
      loginStateComponent =
      <nav>
        <ul>
          <li><NavLink to="/" className="navigationItems">Home</NavLink></li>
          <li><NavLink to="/savedrestaurants" className="navigationItems">Saved Restaurants</NavLink></li>
        </ul>
        <ul className='loginArea'>
          <li onClick={() => this.handleLogout()}><a className="navigationItems" href="">Logout</a></li>
        </ul>
      </nav>
    }
    else {
      loginStateComponent =
      <nav>
        <ul>
          <li><NavLink to="/" className="navigationItems">Home</NavLink></li>
        </ul>
        <ul className='loginArea'>
          <li>
            <NavLink to="/login" className="navigationItems">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="navigationItems">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </nav>
    }

    return (
      <div>
        {loginStateComponent}
      </div>
    );
  }

}

module.exports = withRouter(Navigation);