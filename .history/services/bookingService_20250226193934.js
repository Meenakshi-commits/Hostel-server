const Booking = require("../models/Booking");
const Room = require("../models/Room");

exports.createBooking = async (userId, roomId, checkIn, checkOut) => {
  const room = await Room.findById(roomId);
  if (!room) throw new Error("Room not found");

  const booking = await Booking.create({
    user: userId,
    room: roomId,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    status: "Pending",
  });

  return booking;
};

exports.getBookingsByUser = async (userId) => {
  return await Booking.find({ user: userId }).populate("room");
};

exports.updateBookingStatus = async (bookingId, status) => {
  return await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
};
