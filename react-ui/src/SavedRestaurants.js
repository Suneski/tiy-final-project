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

  componentDidMount() {
    this.summonTheData();
  }

  summonTheData() {
    $.ajax({
      url: '/api/savedrestaurants'
    })
    .done((data) => {
      this.setState({
        savedRestaurants: data
      })
      console.log('grabbing data', this.state.searchResults);
    });
  }

  clickit() {
    console.log(this.state.savedRestaurants);
  }


  render() {
    let savedPlaces = this.state.savedRestaurants.map((x) => <SavedRestaurantsLi
      key={x._id}
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
        <ol>
          {savedPlaces}
        </ol>

      </div>
    )
  }
}

module.exports = SavedRestaurants;
