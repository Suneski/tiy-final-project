const express = require('express');
const Restaurant = require('./models/SavedRestaurants.js');

const app = express.Router();

function formatRestaurant(restaurant) {
  return {
    _id: restaurant._id,
    id: restaurant.id,
    name: restaurant.name,
    url: restaurant.url,
    image_url: restaurant.image_url,
    rating: restaurant.rating,
    price: restaurant.price,
    address1: restaurant.address1,
    address2: restaurant.address2,
    address3: restaurant.address3,
    city: restaurant.city,
    state: restaurant.state,
    zip_code: restaurant.zip_code,
    country: restaurant.country,
    notes: restaurant.notes,
  }
}

app.get('/api/savedrestaurants', (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .exec((err, data) => {
//      console.log(arguments);
      res.send({
        restaurants: data.map((restaurant) => formatRestaurant(restaurant))
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
  restaurant.userId = req.user._id;
  restaurant.notes = 'No saved note!';

  restaurant.save((err, data) => {
    console.log('is it saving?!');
    res.send(formatRestaurant(data));
  });
});

app.delete('/api/savedrestaurants/:id', (req, res) => {
  var cb = (err, data) => {
    if (err === null) {
      res.sendStatus(204);
    }
  };

  Restaurant.findByIdAndRemove(req.params.id, cb);
});

app.post('/api/savedrestaurants/:id', (req, res) => {
  let notes = req.body.notes;



  Restaurant.findByIdAndUpdate(req.params.id, {
  $set: {
    notes: notes
  }},
  (err, data) => {
    res.sendStatus(204);
  });
});

module.exports = app
