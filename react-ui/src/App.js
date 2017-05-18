import React, { Component } from 'react';
import './App.css';

import RestaurantQuery from './RestaurantQuery.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <RestaurantQuery />
      </div>
    );
  }
}

export default App;
