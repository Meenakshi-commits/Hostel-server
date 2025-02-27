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
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Hostel Management System API');
});

// API status check route
app.get('/api', (req, res) => {
  res.send('API is running');
});

// Import room routes
const roomRoutes = require('./routes/rooms');
app.use('/api/rooms', roomRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
