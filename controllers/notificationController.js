const { sendEmail } = require("../utils/sendEmail.js");
const { sendSMS } = require("../utils/sendSMS.js");

// Send Email Notification
const sendEmailNotification = async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await sendEmail(to, subject, message);
    res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Email sending failed", error });
  }
};

// Send SMS Notification
const sendSMSNotification = async (req, res) => {
  const { phone, message } = req.body;

  try {
    await sendSMS(phone, message);
    res.json({ success: true, message: "SMS sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "SMS sending failed", error });
  }
};

module.exports = {
  sendEmailNotification,
  sendSMSNotification,
};
