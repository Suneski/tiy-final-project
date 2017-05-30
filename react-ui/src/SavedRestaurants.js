import React from 'react';
import { store, actions } from './reducers/Store.js';

import SavedRestaurantsLi from './SavedRestaurantsLi.js';
import RandomRestaurant from './RandomRestaurant.js';

import './index.css';

import Api from './Api.js';

class SavedRestaurants extends React.Component {
  constructor() {
    super();

    this.state = store.getState();
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => this.setState(store.getState()));
    this.summonSavedRestarants();
  }

  componentWillUnmount() {
    this.unsub();
  }

  summonSavedRestarants() {
    Api.summonSavedRestarants();
  }

  removeFavorite(id) {
    Api.removeFavorite(id);
  }

  randomizer() {
    let savedRestaurants = this.state.queries.savedRestaurants;
    let randomNum = Math.floor(Math.random() * this.state.queries.savedRestaurants.length);
    let randomRestaurant = savedRestaurants[randomNum];

    let locationArray = [randomRestaurant.address1.split(' ').join('+'), randomRestaurant.city.split(' ').join('+'), randomRestaurant.state.split(' ').join('+')];
    let location = locationArray.join('+');

    store.dispatch({ type: actions.SHOW_RANDOM, value: randomRestaurant, value2: location });
  }

  backToSaved() {
    store.dispatch({ type: actions.SHOW_SAVED });
  }

  render() {
    let savedRestaurantsHeader;

    let randSaved = this.state.randomSaved;
    let randSavedRest = randSaved.randomRestaurant;
    let randomRestaurantLi = <RandomRestaurant
      key={randSavedRest.id}
      id={randSavedRest._id}
      name={randSavedRest.name}
      imageUrl={randSavedRest.image_url}
      url={randSavedRest.url}
      rating={randSavedRest.rating}
      price={randSavedRest.price}
      address1={randSavedRest.address1}
      address2={randSavedRest.address2}
      address3={randSavedRest.address3}
      city={randSavedRest.city}
      state={randSavedRest.state}
      zipCode={randSavedRest.zip_code}
      country={randSavedRest.country}
      location={randSaved.randomRestaurantLocation}
    />;

    let savedPlaces = this.state.queries.savedRestaurants.map((x) => <SavedRestaurantsLi
      key={x.id}
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
      removeFavorite={() => this.removeFavorite(x._id)}
    />);

    let name = this.state.user.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);

    let savedRestNum = this.state.queries.savedRestaurants.length;

    let welcome = <h1>Welcome back, {name}!</h1>;

    if (this.state.user.isLoggedIn === false) {
      savedRestaurantsHeader = <h1 className='logInViewSaves'>Log in to view saved restaurants</h1>;
    }
    else if (savedRestNum === 0) {
      savedRestaurantsHeader = <div className='welcome'>
        {welcome}
        <h1>You have no saved restaurants.</h1>
      </div>
    }
    else if (savedRestNum === 1) {
      savedRestaurantsHeader = <div className='welcome'>
        {welcome}
        <h1>You have {savedRestNum} saved restaurant.</h1>
      </div>
    }
    else {
      savedRestaurantsHeader = <div className='welcome'>
        {welcome}
        <h1>You have {savedRestNum} saved restaurants.</h1>
        <div className='saved-restaurant-buttons-zone'>
          <div>
            <button
              onClick={() => this.randomizer()} className='saved-restaurant-buttons'>
                RANDOM
            </button>
          </div>
          <div className={randSaved.savedRandVisible}>
            <button
              onClick={() => this.backToSaved()} className='saved-restaurant-buttons'>
                SHOW ALL
            </button>
          </div>


        </div>

      </div>
    }

    return (
      <div>
        <div className="saved-restaurant-header">
          {savedRestaurantsHeader}
        </div>

        <div className="body-container">
          <ol className={randSaved.savedRestVisible}>
            {savedPlaces}
          </ol>
          <ol className={randSaved.savedRandVisible}>
            {randomRestaurantLi}
          </ol>
        </div>

      </div>
    )
  }
}

module.exports = SavedRestaurants;
