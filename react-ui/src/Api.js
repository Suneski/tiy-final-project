import $ from 'jquery';

const Api = {

  summonSavedRestarants(cb) {
    $.ajax({
      url: '/api/savedrestaurants'
    })
    .done((data) => {
      cb(data);
    });
  }

}

module.exports = Api;
