const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, message) => {
  const msg = {
    to,
    from: "your_email@example.com",
    subject,
    text: message,
  };

  await sgMail.send(msg);
};

module.exports = {
  sendEmail,
};
