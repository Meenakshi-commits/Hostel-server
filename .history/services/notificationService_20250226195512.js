const Notification = require("../models/Notification.js");

const logNotification = async (userId, type, message) => {
  return await Notification.create({ user: userId, type, message });
};

module.exports = {
  logNotification,
};
