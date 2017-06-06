// import technologies
import React from 'react';

// import components and other files
import SearchResultLi from './SearchResultsLi.js';
import Api from './Api.js';
import { store, actions } from './reducers/Store.js';

// import css
import './index.css';

// import images
import loader from './images/ajax_loader.gif';
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

  hitSearch() {
    store.dispatch({ type: actions.RESET_PAGE });
    this.summonTheData();
  }

  summonTheData() {

    let state = store.getState();

    store.dispatch({ type: actions.HIDE_PAGE_VIEW });

    const url = `/api/yelp?restaurantSearch=${state.queries.restaurantNameQuery}&locationSearch=${state.queries.locationQuery}&resultLimit=${state.queries.resultsPerPage}&sortBy=${state.queries.sortResults}&price=${state.queries.sortPrice}&offset=${state.queries.offset}`

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
      Api.summonTheData(url, state.queries.resultsPerPage, state.queries.page);
      store.dispatch({ type: actions.LOADING });
    }










  }

  restaurantNameSubmit(evt) {
    store.dispatch({ type: actions.RESTAURANT_SEARCH, value: evt.target.value });
  }

  locationSubmit(evt) {
    store.dispatch({ type: actions.LOCATION_SEARCH, value: evt.target.value });
  }

  limitTotal(evt) {
    let limitTotalInt = parseInt(evt.target.value, 10);
    store.dispatch({ type: actions.RESULTS_TOTAL, value: limitTotalInt, page: 1 });
    this.summonTheData();
  }

  sortResults(evt) {
    store.dispatch({ type: actions.SORT_RESULTS, value: evt.target.value, page: 1 });
    this.summonTheData();
  }

  sortPrice(evt) {
    store.dispatch({ type: actions.SORT_PRICE, value: evt.target.value, page: 1 });
    this.summonTheData();
  }

  handleRestaurantAddFilter(x) {
    Api.handleRestaurantAddFilter(x);
  }

  previousPage() {
    // let state = store.getState();
    let offset = this.state.queries.offset - this.state.queries.resultsPerPage;
    let page = this.state.queries.page;

    store.dispatch({ type: actions.PREVIOUS_PAGE, value: offset, pageSubtract: page - 1 });

    this.summonTheData();
  }

  nextPage() {
    // let state = store.getState();
    let offset = this.state.queries.offset + this.state.queries.resultsPerPage;
    let page = this.state.queries.page;

    store.dispatch({ type: actions.NEXT_PAGE, value: offset, pageAdd: page + 1 });

    this.summonTheData();
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
              onClick={() => this.hitSearch()}
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

        <div className={this.state.queries.pageView} id='page-nav'>
          <p className="page-view-item">Total Results: {this.state.queries.totalResults}</p>
          <p className="page-view-item">Page {this.state.queries.page} of {this.state.queries.pageCount}</p>

          <div id='page-buttons'>
            <button
              onClick={() => this.previousPage()}
              className={this.state.queries.previousButtonVisible}>
                PREVIOUS
            </button>


            <button
              onClick={() => this.nextPage()}
              className={this.state.queries.nextButtonVisible}>
                NEXT
            </button>
          </div>

        </div>


        <div className="body-container">


          <img
            src={loader}
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
