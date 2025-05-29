const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const flightController = require("../controllers/flight");

router.post("/", auth, isAdmin, flightController.createFlight);
router.get("/", auth, flightController.getFlights);
router.put("/:id", auth, isAdmin, flightController.updateFlight);
router.delete("/:id", auth, isAdmin, flightController.deleteFlight);

module.exports = router;
