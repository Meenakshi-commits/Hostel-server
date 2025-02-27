import Notification from "../models/Notification.js";

export const logNotification = async (userId, type, message) => {
  return await Notification.create({ user: userId, type, message });
};
