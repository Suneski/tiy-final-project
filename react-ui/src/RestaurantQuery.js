import React from 'react';
import $ from 'jquery';
import './RestaurantQuery.css';

import SearchResultLi from './SearchResultsLi.js'

class RestaurantQuery extends React.Component {
  constructor() {
    super();

    this.state = {
      restaurantNameQuery: '',
      locationQuery: '',
      resultsPerPage: '',
      sortResults: '',
      inputValue: '',
      searchResults: []
    }
  }

  summonTheData() {
    const url = `/api/yelp?restaurantSearch=${this.state.restaurantNameQuery}&locationSearch=${this.state.locationQuery}&resultLimit=${this.state.resultsPerPage}&sortBy=${this.state.sortResults}`

    if (this.state.restaurantNameQuery === '' && this.state.locationQuery === '') {
      alert('Add a restaurant and a location!');
      return;
    }
    if (this.state.restaurantNameQuery === '' && this.state.locationQuery !== '') {
      alert('Add a restaurant!');
    }
    if (this.state.restaurantNameQuery !== '' && this.state.locationQuery === '') {
      alert('Add a location!');
    }
    else {
      $.ajax({
        url: url
      })
      .done((data) => {
        this.setState({
          searchResults: data.data
        })
        console.log('grabbing data', this.state.searchResults);
      });
    }
  }

  restaurantNameSubmit(evt) {
    this.setState({
      restaurantNameQuery: evt.target.value
    });
  }

  locationSubmit(evt) {
    this.setState({
      locationQuery: evt.target.value
    });
  }

  limitTotal(evt) {
    console.log(evt.target.value)
    this.setState({
      resultsPerPage: evt.target.value
    }, () => this.summonTheData())
  }

  sortResults(evt) {
    console.log(evt.target.value)
    this.setState({
      sortResults: evt.target.value
    }, () => this.summonTheData())
  }

  handleRestaurantAdd(x) {
  $.ajax({
    method: 'POST',
    url: '/api/restaurant/',
    data: {
      name: x.name,
      url: x.url
    }
  }, () => console.log(x))
  .done((data) => {
    console.log('is it gathering data?', data);
  });
}

  render() {

    let names = this.state.searchResults.map((x) => <SearchResultLi
      key={x.id}
      name={x.name}
      imageUrl={x.image_url}
      url={x.url}
      rating={x.rating}
      price={x.price}
      address1={x.location.address1}
      address2={x.location.address2}
      address3={x.location.address3}
      city={x.location.city}
      state={x.location.state}
      zipCode={x.location.zip_code}
      country={x.location.country}
      addRestaurant={() => this.handleRestaurantAdd(x)}
    />);


    return (
      <div>
        <div>Restaurant Type <input placeholder="restaurant type" onKeyUp={(evt) => this.restaurantNameSubmit(evt)} /></div>
        <div>Location
          <input placeholder="city" onKeyUp={(evt) => this.locationSubmit(evt)} />
        </div>
        <div>Results:
          <select onChange={(evt) => this.limitTotal(evt)}>
            <option value='20'>20</option>
            <option value='30'>30</option>
            <option value='40'>40</option>
            <option value='50'>50</option>
          </select>
        </div>
        <div>Sort by:
          <select onChange={(evt) => this.sortResults(evt)}>
            <option value='best_match'>Best Match</option>
            <option value='rating'>Rating</option>
            <option value='review_count'>Review Count</option>
            <option value='distance'>Distance</option>
          </select>
        </div>
        <div><button onClick={() => this.summonTheData()}>SEARCH!</button></div>
        <ol>
          {names}
        </ol>
      </div>
    )

  }
}

module.exports = RestaurantQuery;
