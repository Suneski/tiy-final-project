import React, { Component } from 'react';

import notfound from './images/404.gif';

class NotFound extends Component {
  render() {
    return (
      <div>
        <img src={notfound} alt="not found" className="not-found"/>
      </div>
    )
  }
}

export default NotFound;
