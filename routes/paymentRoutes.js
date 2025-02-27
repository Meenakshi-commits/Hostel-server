const express = require('express');
const { createPaymentOrder, verifyPayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/razorpay', createPaymentOrder);
router.post('/razorpay/verify', verifyPayment);

module.exports = router;
