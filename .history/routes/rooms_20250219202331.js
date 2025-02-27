const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get available rooms
router.get('/available', async (req, res) => {
  try {
    const availableRooms = await Room.find({ status: 'available' });
    res.json(availableRooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new room (Admin use-case)
router.post('/', async (req, res) => {
  const { roomNumber, capacity } = req.body;
  const room = new Room({ roomNumber, capacity });
  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update room allocation (e.g., assign occupant)
router.put('/:id/allocate', async (req, res) => {
  try {
    const { residentId } = req.body; // Assuming residentId is provided
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Check capacity
    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ message: 'Room is full' });
    }

    // Add resident to occupants
    room.occupants.push(residentId);

    // Update status if room becomes full
    if (room.occupants.length === room.capacity) {
      room.status = 'occupied';
    }

    await room.save();
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Handle check-out (remove occupant)
router.put('/:id/check-out', async (req, res) => {
  try {
    const { residentId } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    // Remove the resident from occupants
    room.occupants = room.occupants.filter(id => id.toString() !== residentId);
    room.status = 'available';  // Reset status after check-out

    await room.save();
    res.json(room);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
