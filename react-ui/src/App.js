import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import './style/App.css';

import RestaurantQuery from './RestaurantQuery.js';
import SavedRestaurants from './SavedRestaurants.js';
import SignUp from './SignUp.js';

import notfound from './images/404.gif';

var NotFound = () => (
  <div>
    <img src={notfound} alt="not found" className="not-found"/>
  </div>
)

var Navigation = () => {
  return <nav>
    <ul>
      <li><NavLink to="/" className="navigationItems">Home</NavLink></li>
      <li><NavLink to="/savedrestaurants" className="navigationItems">Saved Restaurants</NavLink></li>
    </ul>
    <ul className='loginArea'>
      <li><NavLink to="/" className="navigationItems">Login</NavLink></li>
      <li><NavLink to="/signup" className="navigationItems">Sign Up</NavLink></li>
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
            <Switch>
              <Route path="/" exact component={RestaurantQuery} />
              <Route path="/savedrestaurants" component={SavedRestaurants} />
              <Route path="/signup" component={SignUp} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
