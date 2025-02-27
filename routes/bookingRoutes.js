const express = require("express");
const Booking = require("../models/Booking.js");

const router = express.Router();

// Create Booking
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
