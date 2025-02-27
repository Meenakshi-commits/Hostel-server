const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const { protect, admin } = require("../middleware/authMiddleware");

router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.post("/", protect, admin, createRoom);
router.put("/:id", protect, admin, updateRoom);
router.delete("/:id", protect, admin, deleteRoom);

module.exports = router;
