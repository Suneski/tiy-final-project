import React from 'react';
import $ from 'jquery';

import SavedRestaurantsLi from './SavedRestaurantsLi.js'

class SavedRestaurants extends React.Component {
  constructor() {
    super();

    this.state = {
      savedRestaurants: []
    }
  }

  clickit() {
    console.log(this.state)
  }

  componentDidMount() {
    this.summonSavedRestarants();
  }

  summonSavedRestarants() {
    $.ajax({
      url: '/api/savedrestaurants'
    })
    .done((data) => {
      this.setState({
        savedRestaurants: data
      })
      console.log('grabbing data');
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
    />);


    return (
      <div>
        <div className="saved-restaurant-header">

        </div>
        <button onClick={() => this.clickit()}>state status!!</button>
        <ol>
          {savedPlaces}
        </ol>

      </div>
    )
  }
}

module.exports = SavedRestaurants;
