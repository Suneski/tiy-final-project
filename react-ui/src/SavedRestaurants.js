import React from 'react';
import { store } from './reducers/Store.js';

import SavedRestaurantsLi from './SavedRestaurantsLi.js'

import Api from './Api.js';

class SavedRestaurants extends React.Component {
  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => this.setState(store.getState()));
    this.summonSavedRestarants();
  }

  componentWillUnmount() {
    this.unsub();
  }

  summonSavedRestarants() {
    Api.summonSavedRestarants();
  }

  removeFavorite(id) {
    Api.removeFavorite(id);
  }

  render() {
    let savedRestaurantsHeader;

    let savedPlaces;

    let name = this.state.user.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);

    if (this.state.user.isLoggedIn === false) {
      savedRestaurantsHeader = <h1 className='logInViewSaves'>Log in to view saved restaurants</h1>;
    }
    else if (this.state.queries.savedRestaurants.length === 0) {
      savedRestaurantsHeader = <div>
        <h1>Welcome back, {name}!</h1>
        <h1>You have no saved restaurants.</h1>
      </div>
    }
    else {
      savedRestaurantsHeader = <div>
        <h1>Welcome back, {name}!</h1>
        <h1>Here are your saved restaurants.</h1>
      </div>

      savedPlaces = this.state.queries.savedRestaurants.map((x) => <SavedRestaurantsLi
        key={x.id}
        id={x._id}
        name={x.name}
        imageUrl={x.image_url}
        url={x.url}
        rating={x.rating}
        price={x.price}
        address1={x.address1}
        address2={x.address2}
        address3={x.address3}
        city={x.city}
        state={x.state}
        zipCode={x.zip_code}
        country={x.country}
        removeFavorite={() => this.removeFavorite(x._id)}
      />);
    }

    return (
      <div>
        <div className="saved-restaurant-header">
          {savedRestaurantsHeader}
        </div>

        <div className="body-container">
          <ol>
            {savedPlaces}
          </ol>
        </div>

      </div>
    )
  }
}

module.exports = SavedRestaurants;
