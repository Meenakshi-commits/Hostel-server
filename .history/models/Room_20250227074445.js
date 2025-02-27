const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ["Single", "Double", "Suite"], required: true },
    price: { type: Number, required: true },
    occupancy: { type: Number, required: true }, // Number of people it accommodates
    isBooked: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
