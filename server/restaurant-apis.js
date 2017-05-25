const express = require('express');
const Restaurant = require('./models/SavedRestaurants.js');

const app = express.Router();

// Answer API requests.
app.get('/api/yelp/', function(req,res) {

  console.log('is the data being summoned?');

  'use strict';

  var output = [];
  var term = `${req.query.restaurantSearch}`;
  var location = `${req.query.locationSearch}`;
  var limit = `${req.query.resultLimit}` || '20';
  var sort_by = `${req.query.sortBy}` || 'best_match';

  const yelp = require('yelp-fusion');

  // Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
  // from https://www.yelp.com/developers/v3/manage_app
  const clientId = 'S0HZe9JeSX10-qMRUtM_4Q';
  const clientSecret = 'ergT0KVaFxSVznE3xZ6kKz9lJwp7SOWe0tlPBheuCL66avlespWmv8zdm68Y5LN4';

  const searchRequest = {
    term: term,
    location: location,
    limit: limit,
    sort_by: sort_by,
  };

  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
      for (var i = 0; i < response.jsonBody.businesses.length; i++) {
        const result = response.jsonBody.businesses[i];
        const prettyJson = JSON.stringify(result, null, 4);
        output.push(result);
      }
      res.send({
        data: output
      })
      console.log(output);
    });
  });
});


app.post('/api/restaurant', function(req, res) {
  console.log('posting restaurant', req.body);

  var restaurant = new Restaurant();
  restaurant.id = req.body.id;
  restaurant.name = req.body.name;
  restaurant.url = req.body.url;
  restaurant.image_url = req.body.image_url;
  restaurant.rating = req.body.rating;
  restaurant.price = req.body.price;
  restaurant.address1 = req.body.address1;
  restaurant.address2 = req.body.address2;
  restaurant.address3 = req.body.address3;
  restaurant.city = req.body.city;
  restaurant.state = req.body.state;
  restaurant.zip_code = req.body.zip_code;
  restaurant.country = req.body.country;

  restaurant.save(function() {
    console.log('is it saving?!');
  });

  res.send('it saved!!!!');
});



app.get('/api/savedrestaurants', function(req, res) {

  Restaurant.find({})
    .exec(function(err, data) {
//      console.log(arguments);
      res.send(data);
    });
});

app.delete('/api/savedrestaurants/:id', (req, res) => {
  var cb = (err, data) => {
    if (err === null) {
      res.sendStatus(204);
    }
  };

  console.log(req.params.id, cb);
  Restaurant.findByIdAndRemove(req.params.id, cb);
});



module.exports = app