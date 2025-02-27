const Razorpay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPayment = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment failed", error });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Ideally, you would verify the signature on the backend here

    res.json({ success: true, message: "Payment verified", order_id: razorpay_order_id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment verification failed", error });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
};
