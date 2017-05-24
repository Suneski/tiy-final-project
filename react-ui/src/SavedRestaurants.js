import React from 'react';
import $ from 'jquery';

import SavedRestaurantsLi from './SavedRestaurantsLi.js'

import Api from './Api.js';

class SavedRestaurants extends React.Component {
  constructor() {
    super();

    this.state = {
      savedRestaurants: []
    }
  }

  componentDidMount() {
    this.summonSavedRestarants();
  }

  summonSavedRestarants() {

    const cb = (data) => {
      this.setState({
        savedRestaurants: data
      })
    }

    Api.summonSavedRestarants(cb);
  }

  removeFavorite(id) {
    console.log(id);
    $.ajax({
      url: `/api/savedrestaurants/${id}`,
      method: 'DELETE'
    })
    .done((data) => {
      this.summonSavedRestarants();
    });
  }

  render() {
    let savedPlaces = this.state.savedRestaurants.map((x) => <SavedRestaurantsLi
      key={x._id}
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


    return (
      <div>
        <div className="saved-restaurant-header">

        </div>
        
        <ol>
          {savedPlaces}
        </ol>

      </div>
    )
  }
}

module.exports = SavedRestaurants;
