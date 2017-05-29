import React from 'react';
import Api from './Api.js';

import './index.css';

class Logout extends React.Component {
  render() {
    return (
      <div className="logout navigationItems">
        <button onClick={() => Api.handleLogout()}>LOG OUT</button>
      </div>
    );
  }
}

module.exports = Logout;
