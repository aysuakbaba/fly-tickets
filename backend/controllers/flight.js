const Flight = require("../models/Flight");
const City = require("../models/City");
const Ticket = require("../models/Ticket");
const { checkValidationError } = require("../utils/validation");

exports.createFlight = async (req, res) => {
  try {
    const customFlightId = `TCK${Math.floor(100 + Math.random() * 900)}`;
    const flight = new Flight({
      ...req.body,
      reference_id: customFlightId,
    });
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFlights = async (req, res) => {
  checkValidationError(req);
  try {
    const { from_city, to_city, departure_time } = req.query;
    const query = {};
    if (from_city && to_city) {
      query.from_city = from_city;
      query.to_city = to_city;
    }
    if (departure_time) {
      const date = new Date(departure_time);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);

      query.departure_time = {
        $gte: date,
        $lt: nextDay,
      };
    }
    const flights = await Flight.find(query)
      .populate({
        path: "from_city",
        model: "City",
      })
      .populate({
        path: "to_city",
        model: "City",
      });
    res.json(flights);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getFlightByID = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id)
      .populate({
        path: "from_city",
        model: "City",
      })
      .populate({
        path: "to_city",
        model: "City",
      });

    if (!flight) return res.status(404).json({ error: "Flight cannot found" });

    const tickets = await Ticket.find({ flight_id: flight._id }).select(
      "seat_number -_id"
    );

    const reservedSeats = tickets.map((ticket) => ticket.seat_number);

    res.json({
      ...flight.toObject(),
      reservedSeats,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
