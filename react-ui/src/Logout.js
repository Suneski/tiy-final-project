import React from 'react';
import $ from 'jquery';


import './index.css';

class Logout extends React.Component {

  handleLogout() {
    $.ajax({
      url: '/api/logout',
      method: 'POST'
    })
    .done(() => {
      console.log('Logout complete.');
    });
  }

  render() {
    return (
      <div className="logout navigationItems">
        <button onClick={() => this.handleLogout()}>LOG OUT</button>
      </div>
    );
  }
}

module.exports = Logout;
