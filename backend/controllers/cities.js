const City = require("../models/City");
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
