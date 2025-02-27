import express from "express";
import { sendEmailNotification, sendSMSNotification } from "../controllers/notificationController.js";

const router = express.Router();

router.post("/email", sendEmailNotification);
router.post("/sms", sendSMSNotification);

export default router;
