const mongoose = require('mongoose');
const City = require('../models/City');
const cities = require('../data/cities');

mongoose.connect('mongodb://localhost:27017/fly-tickets', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  await City.insertMany(cities);
  console.log('Cities inserted');
  mongoose.disconnect();
})
.catch(err => {
  console.error('Error:', err);
});
