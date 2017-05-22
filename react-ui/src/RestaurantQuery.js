import React from 'react';
import $ from 'jquery';
import './RestaurantQuery.css';

import SearchResultLi from './SearchResultsLi.js';

import animeLoader from './images/animeloader.gif';

import yelpLogo from './images/yelp/yelp.png';

class RestaurantQuery extends React.Component {
  constructor() {
    super();

    this.state = {
      restaurantNameQuery: '',
      locationQuery: '',
      resultsPerPage: '',
      sortResults: '',
      inputValue: '',
      searchResults: [],
      addButton: 'addButton',
      loaderClass: 'deactivated',
      resultVisibility: 'resultsVisible'
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
      }, this.setState({
        loaderClass: 'activated',
        resultVisibility: 'resultsNotVisible'
      }))
      .done((data) => {
        this.setState({
          searchResults: data.data,
          loaderClass: 'deactivated',
          resultVisibility: 'resultsVisible'
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
        url: x.url,
        image_url: x.image_url,
        rating: x.rating,
        review_count: x.review_count,
        price: x.price,
        address1: x.location.address1,
        address2: x.location.address2,
        address3: x.location.address3,
        city: x.location.city,
        state: x.location.state,
        zip_code: x.location.zip_code,
        country: x.location.country
      }
    })
    .done((data) => {
      console.log('is it gathering data?', data);
    },
      // alert(x.name + ' added to saved restaurants'),
      this.setState({
        addButton: 'addButtonSelected',
        favorited: 'favorited'
      })
    );
  }

  removeCheckMark() {
    alert('removing from faves, but not yet, that still needs to get figured out');
    this.setState({
      addButton: 'addButton',
      favorited: 'favoritedSelected'
    })
  }

  render() {

    let names = this.state.searchResults.map((x) => <SearchResultLi
      key={x.id}
      name={x.name}
      imageUrl={x.image_url}
      url={x.url}
      rating={x.rating}
      reviewCount={x.review_count}
      price={x.price}
      address1={x.location.address1}
      address2={x.location.address2}
      address3={x.location.address3}
      city={x.location.city}
      state={x.location.state}
      zipCode={x.location.zip_code}
      country={x.location.country}
      addButton={this.state.addButton}
      favorited={x.favorited}
      addRestaurant={() => this.handleRestaurantAdd(x)}
      removeCheckMark={() => this.removeCheckMark()}
    />);


    return (
      <div className="app-container">
        <header>

          <div className="header-items">
            <div className="inputBars">
              <input
                placeholder="restaurant/food"
                type="text"
                className="restaurant-input"
                onKeyUp={(evt) => this.restaurantNameSubmit(evt)} />
              <input
                placeholder="location"
                type="text"
                onKeyUp={(evt) => this.locationSubmit(evt)} />
            </div>
            <button
              onClick={() => this.summonTheData()}
              className="search-button">
                <span className="search-button-text">SEARCH</span>
            </button>
            <div className="filters">
              <div className="filter">Results:
                <select onChange={(evt) => this.limitTotal(evt)}>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                  <option value='40'>40</option>
                  <option value='50'>50</option>
                </select>
              </div>
              <div className="filter">Sort by:
                <select onChange={(evt) => this.sortResults(evt)}>
                  <option value='best_match'>Best Match</option>
                  <option value='rating'>Rating</option>
                  <option value='review_count'>Review Count</option>
                  <option value='distance'>Distance</option>
                </select>
              </div>
            </div>
            <img src={yelpLogo} alt="powered by yelp" className="header-logo"/>
          </div>


        </header>

        <div className="body-container">


          <ol className={this.state.resultVisibility} id="search-results">
            {names}
          </ol>
        </div>

        <img
          src={animeLoader}
          alt="page loader"
          className={this.state.loaderClass} />

      </div>
    )

  }
}

module.exports = RestaurantQuery;
