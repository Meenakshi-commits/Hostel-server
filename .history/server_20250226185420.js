const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB without the unifiedTopology option

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB database connection established successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Hostel Management System API');
});


// Import room routes
const roomRoutes = require('./routes/rooms');
app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

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


app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
