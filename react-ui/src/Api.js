import $ from 'jquery';
import { store, actions } from './reducers/Store.js';

const Api = {

  summonTheData(url, resultsPerPage, page) {
    $.ajax({
      url: url
    })
    .done((data, total) => {

      let pageCount = Math.ceil(data.total / resultsPerPage)

      store.dispatch({
        type: actions.DONE_LOADING, value: data.data });
      store.dispatch({
        type: actions.TOTAL_RESULTS, value: data.total });
      store.dispatch({
        type: actions.TOTAL_PAGES, value: pageCount });
      store.dispatch({ type: actions.SHOW_PAGE_VIEW });

      if (pageCount === 1) {
        store.dispatch({ type: actions.PREVIOUS_BUTTON_INVISIBLE });
        store.dispatch({ type: actions.NEXT_BUTTON_INVISIBLE });
      }
      else {
        store.dispatch({ type: actions.PREVIOUS_BUTTON_VISIBLE });
        store.dispatch({ type: actions.NEXT_BUTTON_VISIBLE });
      }

      if (page < pageCount) {
        store.dispatch({ type: actions.NEXT_BUTTON_VISIBLE });
      }
      if (page === pageCount) {
        store.dispatch({ type: actions.NEXT_BUTTON_INVISIBLE });
      }

      if (page === 1) {
        store.dispatch({ type: actions.PREVIOUS_BUTTON_INVISIBLE });
      }
      else if (page !== 1) {
        store.dispatch({ type: actions.PREVIOUS_BUTTON_VISIBLE });
      }


    }).catch((xhr, error, responseText) => {
      store.dispatch({ type: 'SEARCH_FAILURE', message: 'Location not available.' });
    });
  },

  summonSavedRestarants() {
    $.ajax({
      url: '/api/savedrestaurants'
    })
    .done((data) => {
      store.dispatch({ type: 'SAVED_RESTAURANTS_CB', value: data.restaurants });
    });
  },

  handleRestaurantAdd(x) {
    $.ajax({
      method: 'POST',
      url: '/api/restaurant/',
      data: {
        id: x.id,
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
        country: x.location.country,
      }
    })
    .done((data) => {
      alert(x.name + " added to saved restaurants")}
    )
  },

  handleRestaurantAddFilter(x) {
    $.ajax({
      method: 'GET',
      url: '/api/savedrestaurants/'
    })
    .done((data) => {
      if (data.restaurants.length === 0) {
        this.handleRestaurantAdd(x);
      }
      else {
        for(var i = 0; i < data.restaurants.length; i++) {
          if (x.id === data.restaurants[i].id) {
            alert(x.name + " is already in saved restaurants");
            break;
          }

          else if (i === data.restaurants.length - 1) {
            this.handleRestaurantAdd(x);
            break;
          }
        }
      }

    })
  },

  handleLoginClick(username, password, history) {
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: {
        username: username,
        password: password
      }
    })
    .done((data) => {
      store.dispatch({ type: 'LOGIN' });
      history.push('/savedrestaurants');
    })
    .fail((xhr) => {
      store.dispatch({ type: 'LOGIN_FAILURE', message: 'Unrecognized username or password.' });
    });
  },

  handleLogout() {
    $.ajax({
      url: '/api/logout',
      method: 'POST'
    })
    .done(() => {
      store.dispatch({ type: 'LOGOUT' });
    });
  },

  removeFavorite(id) {
    $.ajax({
      url: `/api/savedrestaurants/${id}`,
      method: 'DELETE'
    })
    .done((data) => {
      this.summonSavedRestarants();
    });
  },

  submitNote(id, notes) {
    $.ajax({
      url: `/api/savedrestaurants/${id}`,
      method: 'POST',
      data: {
        notes: notes
      }
    })
    .done((data) => {
      this.summonSavedRestarants();
    });
  },

  handleSignUpClick(username, password, history) {
    $.ajax({
      url: '/api/signup',
      method: 'POST',
      data: {
        username: username,
        password: password
      }
    })
    .done((data) => {
      store.dispatch({ type: 'SIGNUP' });
      history.push('/savedrestaurants');
    })
    .fail((xhr, error, responseText) => {
      store.dispatch({ type: 'SIGNUP_FAILURE', message: xhr.responseText });
    });
  }

}

module.exports = Api;
