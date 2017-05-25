import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { store } from './Store.js';
import './style/App.css';

import Navigation from './Navigation.js';
import RestaurantQuery from './RestaurantQuery.js';
import SavedRestaurants from './SavedRestaurants.js';
import SignUp from './SignUp.js';
import Login from './Login.js';
import Logout from './Logout.js';
import NotFound from './NotFound.js';

//Following the RR example here: https://reacttraining.com/react-router/web/example/auth-workflow
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class App extends Component {
  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => this.setState(store.getState()));
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation isLoggedIn={this.state.user.isLoggedIn}/>
          <div className="container">
            <Switch>
              <Route
                path="/"
                exact
                component={RestaurantQuery} />
              <Route
                path="/savedrestaurants"
                component={SavedRestaurants} />
              <Route
                path="/login"
                render={(props) => <Login history={props.history} />} />
              <Route
                path="/signup"
                render={(props) => <SignUp {...this.state} history={props.history} /> } />
              <Route
                path="/logout"
                component={Logout} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
