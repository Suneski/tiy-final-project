const express = require('express');
const path = require('path');

const request = require('request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Restaurant = require('./models/SavedRestaurants.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))

// This is what establishes my connection with Mongo
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
mongoose.connect(mongoUrl);


// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

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
  restaurant.name = req.body.name;
  restaurant.url = req.body.url;
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



// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
