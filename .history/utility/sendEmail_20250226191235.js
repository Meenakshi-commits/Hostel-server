import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, message) => {
  const msg = {
    to,
    from: "your_email@example.com",
    subject,
    text: message,
  };

  await sgMail.send(msg);
};
