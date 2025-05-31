const mongoose = require("mongoose");
const City = require("../models/City");
const fligthSchema = new mongoose.Schema({
  from_city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  to_city: {
    type: mongoose.Schema.Types.ObjectId,
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
