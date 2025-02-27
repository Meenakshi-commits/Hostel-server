const User = require("../models/User.js");

const getUserById = async (userId) => {
  return await User.findById(userId);
};

module.exports = {
  getUserById,
};
