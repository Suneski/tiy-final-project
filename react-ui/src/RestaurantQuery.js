// import technologies
import React from 'react';
import $ from 'jquery';

// import components and other files
import SearchResultLi from './SearchResultsLi.js';
import { store } from './Store.js';

// import css
import './RestaurantQuery.css';

// import images
import animeLoader from './images/animeloader.gif';
import yelpLogo from './images/yelp/yelp.png';



class RestaurantQuery extends React.Component {
  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    store.subscribe(() => this.setState(store.getState()));
  }

  summonTheData() {
    console.log("do we state?", this.state)
    const url = `/api/yelp?restaurantSearch=${this.state.queries.restaurantNameQuery}&locationSearch=${this.state.queries.locationQuery}&resultLimit=${this.state.queries.resultsPerPage}&sortBy=${this.state.queries.sortResults}`

    if (this.state.queries.restaurantNameQuery === '' && this.state.queries.locationQuery === '') {
      alert('Add a restaurant and a location!');
      return;
    }
    if (this.state.queries.restaurantNameQuery === '' && this.state.queries.locationQuery !== '') {
      alert('Add a restaurant!');
    }
    if (this.state.queries.restaurantNameQuery !== '' && this.state.queries.locationQuery === '') {
      alert('Add a location!');
    }
    else {
      $.ajax({
        url: url
      })
      .done((data) => {
        // console.log("ajax call console log", data);
        store.dispatch({ type: 'DONE_LOADING', value: data.data });
      })
      store.dispatch({ type: 'LOADING' })
    }
  }

  restaurantNameSubmit(evt) {
    // console.log("restaurant: ", evt.target.value);
    store.dispatch({ type: 'RESTAURANT_SEARCH', value: evt.target.value });
  }

  locationSubmit(evt) {
    // console.log("location: ", evt.target.value);
    store.dispatch({ type: 'LOCATION_SEARCH', value: evt.target.value });
  }

  limitTotal(evt) {
    // console.log(evt.target.value)
    store.dispatch({ type: 'RESULTS_TOTAL', value: evt.target.value });
    this.summonTheData();
  }

  sortResults(evt) {
    // console.log(evt.target.value)
    store.dispatch({ type: 'SORT_TOTAL', value: evt.target.value });
    this.summonTheData()
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

    console.log("search results?", this.state.queries.searchResults);
    console.log("state?", this.state);

    let names = this.state.queries.searchResults.map((x) => <SearchResultLi
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
      favorited={this.state.favorited}
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


          <ol className={this.state.queries.resultVisibility} id="search-results">
            {names}
          </ol>
        </div>

        <img
          src={animeLoader}
          alt="page loader"
          className={this.state.queries.loaderClass} />

      </div>
    )

  }
}

module.exports = RestaurantQuery;
