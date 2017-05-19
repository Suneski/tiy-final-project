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
      url={x.url}
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
