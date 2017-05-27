import $ from 'jquery';
import { store } from './Store.js';

const Api = {

  summonTheData(url) {
    $.ajax({
      url: url
    })
    .done((data) => {
      store.dispatch({ type: 'DONE_LOADING', value: data.data });
    })
  },


  // handleLoginClick(username, password, push) {
  //   $.ajax({
  //     url: '/api/login',
  //     method: 'POST',
  //     data: {
  //       username: username,
  //       password: password
  //     }
  //   })
  //   .done((data) => {
  //     store.dispatch({ type: 'LOGIN' });
  //     push;
  //   })
  //   .fail((xhr) => {
  //     store.dispatch({ type: 'LOGIN_FAILURE', message: 'Unrecognized username or password.' });
  //   });
  // },

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
    );
  },
}

module.exports = Api;
