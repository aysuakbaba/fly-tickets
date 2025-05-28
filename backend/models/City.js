const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city_id: String,
  city_name: String,
});

module.exports = mongoose.model('City', citySchema);
