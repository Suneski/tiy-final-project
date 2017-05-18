const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

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

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
