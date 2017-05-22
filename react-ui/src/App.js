import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';

import RestaurantQuery from './RestaurantQuery.js'
import SavedRestaurants from './SavedRestaurants.js'


var Navigation = () => {
  return <nav>
    <ul>
      <li><NavLink to="/" className="navigationItems">Home</NavLink></li>
      <li><NavLink to="/savedrestaurants" className="navigationItems">Saved Restaurants</NavLink></li>
    </ul>
  </nav>
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <div className="container">
            <Route path="/" exact component={RestaurantQuery} />
            <Route path="/savedrestaurants" component={SavedRestaurants} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
