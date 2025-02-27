import Razorpay from "razorpay";
import dotenv from "dotenv";
import Payment from "../models/Payment.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createPaymentOrder = async (userId, amount, currency = "INR") => {
  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
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

export const updatePaymentStatus = async (transactionId, status) => {
  return await Payment.findOneAndUpdate({ transactionId }, { status }, { new: true });
};
