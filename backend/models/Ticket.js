const mongoose = require("mongoose");
const Flight = require("../models/Flight");
const crypto = require("crypto");

const ticketSchema = new mongoose.Schema({
  ticket_id: {
    type: String,
    required: true,
    unique: true,
  },
  passenger_name: String,
  passenger_surname: String,
  passenger_email: String,
  flight_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  seatNumber: String,
  booking_date: Date,
});

ticketSchema.pre("validate", function (next) {
  if (!this.ticket_id) {
    const randomStr = crypto.randomBytes(3).toString("hex").toUpperCase();
    this.ticket_id = `TCK-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${randomStr}`;
  }
  next();
});

module.exports = mongoose.model("Ticket", ticketSchema);
