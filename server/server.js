const express = require('express');
const path = require('path');
const request = require('request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

mongoose.Promise = global.Promise;
var mongoURL = process.env.DB_PATH || process.env.MONGODB_URI;
mongoose.connect(mongoURL);

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./yelp-api.js'));

require('./auth.js')(app);

app.use(require('./restaurant-apis.js'));

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
