const { createBooking, getBookingsByUser, updateBookingStatus } = require("../services/bookingService.js");
const mongoose = require("mongoose");

// 🏨 Book a Room
const bookRoom = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(req.user.id) || !mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ error: "Invalid user or room ID" });
    }

    // Validate required fields
    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({ error: "Check-in and Check-out dates are required" });
    }

    // Create booking
    const booking = await createBooking(req.user.id, roomId, checkInDate, checkOutDate);
    return res.status(201).json({ message: "Room booked successfully", booking });
  } catch (error) {
    return res.status(500).json({ error: "Booking failed", details: error.message });
  }
};

// 📋 Get Bookings by User
const getUserBookings = async (req, res) => {
  try {
    const bookings = await getBookingsByUser(req.user.id);
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching bookings", details: error.message });
  }
};

// 🔄 Update Booking Status
const updateBooking = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    // Validate Booking ID
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ error: "Invalid booking ID" });
    }

    // Validate Status
    if (!status) {
      return res.status(400).json({ error: "Booking status is required" });
    }

    // Update booking status
    const updatedBooking = await updateBookingStatus(bookingId, status);
    return res.json({ message: "Booking updated successfully", updatedBooking });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update booking", details: error.message });
  }
};

module.exports = {
  bookRoom,
  getUserBookings,
  updateBooking,
};
