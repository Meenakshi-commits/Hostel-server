const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const bookingRoutes = require("./routes/bookingRoutes.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const notificationRoutes = require("./routes/notificationRoutes.js");
const errorHandler = require("./middleware/errorHandler.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Hostel Management System API');
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);



app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








