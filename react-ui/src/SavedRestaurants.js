import React from 'react';
import $ from 'jquery';

class SavedRestaurants extends React.Component {
  constructor() {
    super();
    this.state = {
      savedRestaurants: []
    }
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
    return (
      <div onClick={() => this.clickit()}>TEST TEXT FOR SAVED RESTAURANTS</div>
    )
  }
}

module.exports = SavedRestaurants;
