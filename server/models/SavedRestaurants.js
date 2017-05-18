const mongoose = require('mongoose');

const Restaurant = mongoose.model('Restaurant', { name: String, url: String })


module.exports = Restaurant;
