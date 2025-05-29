const mongoose = require("mongoose");
const fligthSchema = new mongoose.Schema({
  from_city: {
    type: String,
    ref: "City",
    required: true,
  },
  to_city: {
    type: String,
    ref: "City",
    required: true,
  },
  departure_time: {
    type: Date,
    required: true,
  },
  arrival_time: {
    type: Date,
    required: true,
  },
  price: Number,
  seats_total: Number,
  seats_available: Number,
});

module.exports = mongoose.model("Flight", fligthSchema);
