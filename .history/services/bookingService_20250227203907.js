const Booking = require("../models/Booking");
const Room = require("../models/Room");
const mongoose = require('mongoose'); // Add mongoose for ObjectId validation

const createBooking = async (userId, roomId, checkIn, checkOut) => {
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(roomId)) {
    throw new Error("Invalid user or room ID");
  }
  const room = await Room.findById(roomId);
  if (!room) throw new Error("Room not found");

  const booking = await Booking.create({
    user: mongoose.Types.ObjectId(userId),
    room: mongoose.Types.ObjectId(roomId),
    checkInDate: checkIn,
    checkOutDate: checkOut,
    status: "Pending",
  });

  return booking;
};

const getBookingsByUser = async (userId) => {
  return await Booking.find({ user: userId }).populate("room");
};

const updateBookingStatus = async (bookingId, status) => {
  return await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
};

module.exports = {
  createBooking,
  getBookingsByUser,
  updateBookingStatus,
};
