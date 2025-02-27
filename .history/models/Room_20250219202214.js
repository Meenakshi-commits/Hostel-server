const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  occupants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident'  // Reference to resident model (create this later)
  }],
  status: {
    type: String,
    enum: ['available', 'occupied', 'maintenance'],
    default: 'available',
  },
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
