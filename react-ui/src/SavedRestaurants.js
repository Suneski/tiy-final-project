import React from 'react';
import $ from 'jquery';
import { store } from './Store.js';

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
    $.ajax({
      url: `/api/savedrestaurants/${id}`,
      method: 'DELETE'
    })
    .done((data) => {
      this.summonSavedRestarants();
    });
  }

  render() {
    let state = store.getState();

    let noSavedRestaurants;

    let savedPlaces;

    if (this.state.queries.savedRestaurants.length === 0) {
      noSavedRestaurants = <h1>You have no saved restaurants</h1>;
    }

    else {
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
          {noSavedRestaurants}
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
