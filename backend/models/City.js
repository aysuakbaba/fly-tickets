const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city_name: String,
});

module.exports = mongoose.model("City", citySchema);
