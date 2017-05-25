import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import './style/App.css';

import RestaurantQuery from './RestaurantQuery.js';
import SavedRestaurants from './SavedRestaurants.js';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Navigation from './Navigation.js';

import notfound from './images/404.gif';

var NotFound = () => (
  <div>
    <img src={notfound} alt="not found" className="not-found"/>
  </div>
)

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
              <Route path="/login" component={Login} />
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
