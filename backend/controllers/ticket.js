const Ticket = require("../models/Ticket");
const Flight = require("../models/Flight");

exports.bookTicket = async (req, res) => {
  try {
    const {
      passenger_name,
      passenger_surname,
      passenger_email,
      flight_id,
      seat_number,
    } = req.body;
    const flight = await Flight.findById(flight_id);
    if (!flight) return res.status(404).json({ error: "Flight not found" });
    if (flight.seats_available <= 0) {
      return res.status(400).json({ error: "No seats available" });
    }
    const ticket = await Ticket.create({
      passenger_name,
      passenger_surname,
      passenger_email,
      flight_id,
      seat_number,
      booking_date: new Date(),
    });

    flight.seats_available -= 1;
    await flight.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed" });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      ticket_id: req.params.id,
    }).populate({
      path: "flight_id",
      populate: ["from_city", "to_city"],
    });
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate({
      path: "flight_id",
      populate: ["from_city", "to_city"],
    });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
