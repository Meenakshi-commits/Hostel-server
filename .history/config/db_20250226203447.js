const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;


module.exports = connectDB;
