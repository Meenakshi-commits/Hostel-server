const express = require("express");
const { createPayment, verifyPayment } = require("../controllers/paymentController.js");

const router = express.Router();

router.post("/create", createPayment);
router.post("/verify", verifyPayment);

module.exports = router;
