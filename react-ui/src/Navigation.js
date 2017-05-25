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
      loginStateComponent = <ul className='loginArea'>
        <li onClick={() => this.handleLogout()}><a className="navigationItems" href="">Logout</a></li>
      </ul>
    }
    else {
      loginStateComponent = <ul className='loginArea'>
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

    }

    return (
      <nav>
        <ul>
          <li><NavLink to="/" className="navigationItems">Home</NavLink></li>
          <li><NavLink to="/savedrestaurants" className="navigationItems">Saved Restaurants</NavLink></li>
        </ul>

        <ul className='loginArea'>

          {loginStateComponent}

        </ul>
      </nav>
    );
  }

}

module.exports = withRouter(Navigation);
