const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const flightController = require("../controllers/flight");
const { query } = require("express-validator");

router
  .route("/")
  .get(
    [
      (query("from_city").isString().optional(),
      query("to_city").isString().optional()),
    ],
    flightController.getFlights
  )
  .post(isAdmin, flightController.createFlight);
router
  .route("/:id")
  .get(flightController.getFlightByID)
  .put(isAdmin, flightController.updateFlight)
  .delete(isAdmin, flightController.deleteFlight);

module.exports = router;
