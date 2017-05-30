// import technologies
import React from 'react';

// import components and other files
import SearchResultLi from './SearchResultsLi.js';
import Api from './Api.js';
import { store, actions } from './reducers/Store.js';

// import css
import './index.css';

// import images
import animeLoader from './images/animeloader.gif';
import yelpLogo from './images/yelp/yelp.png';

class RestaurantQuery extends React.Component {
  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsub();
  }

  summonTheData() {

    let state = store.getState();

    const url = `/api/yelp?restaurantSearch=${state.queries.restaurantNameQuery}&locationSearch=${state.queries.locationQuery}&resultLimit=${state.queries.resultsPerPage}&sortBy=${state.queries.sortResults}&price=${state.queries.sortPrice}`

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
      Api.summonTheData(url);
      store.dispatch({ type: 'LOADING' });
    }
  }

  restaurantNameSubmit(evt) {
    store.dispatch({ type: actions.RESTAURANT_SEARCH, value: evt.target.value });
  }

  locationSubmit(evt) {
    store.dispatch({ type: actions.LOCATION_SEARCH, value: evt.target.value });
  }

  limitTotal(evt) {
    store.dispatch({ type: actions.RESULTS_TOTAL, value: evt.target.value });
    this.summonTheData();
  }

  sortResults(evt) {
    store.dispatch({ type: actions.SORT_RESULTS, value: evt.target.value });
    this.summonTheData();
  }

  sortPrice(evt) {
    store.dispatch({ type: actions.SORT_PRICE, value: evt.target.value });
    this.summonTheData();
  }

  handleRestaurantAddFilter(x) {
    Api.handleRestaurantAddFilter(x);
  }

  render() {

    let message;
    if (this.state.queries.searchErrorMessage !== '') {
      message = <div className="error-message">{this.state.queries.searchErrorMessage}</div>
    }

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
      latitude={x.coordinates.latitude}
      longitude={x.coordinates.longitude}
      addButton={this.state.user.addButton}
      addRestaurant={() => this.handleRestaurantAddFilter(x)}
      removeCheckMark={() => this.removeCheckMark()}
    />);

    return (
      <div className="app-container">
        <header>

          <div className='search-box'>
            <div className="input-bars">
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
                SEARCH
            </button>
            {message}
            <div className="filters">
              <div className="filter"><span className="filter-name">Results:</span>
                <select onChange={(evt) => this.limitTotal(evt)}>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                  <option value='40'>40</option>
                  <option value='50'>50</option>
                </select>
              </div>
              <div className="filter"><span className="filter-name">Sort by:</span>
                <select onChange={(evt) => this.sortResults(evt)}>
                  <option value='best_match'>Best Match</option>
                  <option value='rating'>Rating</option>
                  <option value='review_count'>Review Count</option>
                  <option value='distance'>Distance</option>
                </select>
              </div>
              <div className="filter"><span className="filter-name">Price:</span>
                <select onChange={(evt) => this.sortPrice(evt)}>
                  <option value='1,2,3,4'>All</option>
                  <option value='1'>$</option>
                  <option value='2'>$$</option>
                  <option value='3'>$$$</option>
                  <option value='4'>$$$$</option>
                </select>
              </div>
            </div>
            <a href="http://www.yelp.com" target="_blank"><img src={yelpLogo} alt="powered by yelp" className="header-logo"/></a>
          </div>



        </header>

        <div className="body-container">

          <img
            src={animeLoader}
            alt="page loader"
            className={this.state.queries.loaderClass} />


          <ol className={this.state.queries.resultsList}>
            {names}
          </ol>

        </div>
      </div>
    )

  }
}

module.exports = RestaurantQuery;
