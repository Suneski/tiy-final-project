// import technologies
import React from 'react';

// import components and other files
import SearchResultLi from './SearchResultsLi.js';
import Api from './Api.js';
import { store, actions } from './Store.js';

// import css
import './style/RestaurantQuery.css';

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

    const url = `/api/yelp?restaurantSearch=${state.queries.restaurantNameQuery}&locationSearch=${state.queries.locationQuery}&resultLimit=${state.queries.resultsPerPage}&sortBy=${state.queries.sortResults}`

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
    // console.log(this.state.queries.sortResults);

    store.dispatch({ type: actions.SORT_RESULTS, value: evt.target.value });
    this.summonTheData();

  }

  handleRestaurantAdd(x) {
    Api.handleRestaurantAdd(x);
  }

  removeCheckMark() {
    Api.removeCheckMark();
  }

  render() {

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
