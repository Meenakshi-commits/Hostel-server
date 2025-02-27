const express = require("express");
const { sendEmailNotification, sendSMSNotification } = require("../controllers/notificationController.js");

const router = express.Router();

router.post("/email", sendEmailNotification);
router.post("/sms", sendSMSNotification);

module.exports = router;
