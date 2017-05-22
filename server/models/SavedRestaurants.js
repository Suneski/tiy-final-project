const mongoose = require('mongoose');

const Restaurant = mongoose.model('Restaurant', {
  id: String,
  name: String,
  url: String,
  image_url: String,
  rating: String,
  price: String,
  address1: String,
  address2: String,
  address3: String,
  city: String,
  state: String,
  zip_code: String,
  country: String
})


module.exports = Restaurant;
