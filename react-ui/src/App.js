import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './style/App.css';

import Navigation from './Navigation.js';
import RestaurantQuery from './RestaurantQuery.js';
import SavedRestaurants from './SavedRestaurants.js';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Logout from './Logout.js';
import NotFound from './NotFound.js';

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
