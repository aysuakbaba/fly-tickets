const Flight = require("../models/Flight");
const City = require("../models/City");

exports.createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFlights = async (req, res) => {
  try {
    const flights = await Flight.find()
      .populate({
        path: "from_city",
        model: "City",
        localField: "from_city",
        foreignField: "city_id",
        justOne: true,
      })
      .populate({
        path: "to_city",
        model: "City",
        localField: "to_city",
        foreignField: "city_id",
        justOne: true,
      });
    res.json(flights);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("flight", flight);
    res.json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: "Flight deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
