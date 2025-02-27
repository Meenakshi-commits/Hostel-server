const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const Payment = require("../models/Payment");

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createPaymentOrder = async (userId, amount, currency = "INR") => {
  const options = {
    amount: amount * 100,
    currency,
    receipt: `order_rcptid_${userId}`,
    payment_capture: 1,
  };

  const order = await razorpay.orders.create(options);

  const payment = await Payment.create({
    user: userId,
    amount,
    paymentMethod: "Razorpay",
    status: "Pending",
    transactionId: order.id,
  });

  return { order, payment };
};

exports.updatePaymentStatus = async (transactionId, status) => {
  return await Payment.findOneAndUpdate({ transactionId }, { status }, { new: true });
};
