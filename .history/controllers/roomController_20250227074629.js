const Room = require("../models/Room");

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error });
  }
};

// Get a single room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room", error });
  }
};

// Create a new room (Admin only)
exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, occupancy, description } = req.body;

    const newRoom = new Room({ roomNumber, type, price, occupancy, description });
    await newRoom.save();

    res.status(201).json({ message: "Room created successfully", newRoom });
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error });
  }
};

// Update a room by ID (Admin only)
exports.updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedRoom) return res.status(404).json({ message: "Room not found" });

    res.status(200).json({ message: "Room updated successfully", updatedRoom });
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error });
  }
};

// Delete a room by ID (Admin only)
exports.deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);

    if (!deletedRoom) return res.status(404).json({ message: "Room not found" });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error });
  }
};
