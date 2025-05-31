const express = require("express");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");
const ticketController = require("../controllers/ticket");

router.post("/", ticketController.bookTicket);
router.get("/:id", ticketController.getTicketById);
router.get("/", isAdmin, ticketController.getAllTickets);

module.exports = router;
