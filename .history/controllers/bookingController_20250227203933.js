const { createBooking, getBookingsByUser, updateBookingStatus } = require("../services/bookingService.js");
const mongoose = require('mongoose'); // Add mongoose for ObjectId validation

const bookRoom = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.user.id) || !mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: "Invalid user or room ID" });
    }
    const booking = await createBooking(req.user.id, roomId, checkInDate, checkOutDate);
    res.status(201).json({ message: "Room booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await getBookingsByUser(req.user.id);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }
    const updatedBooking = await updateBookingStatus(bookingId, status);
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking", error: error.message });
  }
};

module.exports = {
  bookRoom,
  getUserBookings,