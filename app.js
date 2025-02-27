const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

app.use(express.json());

// ...existing code...

app.use('/api/payments', paymentRoutes);

// ...existing code...

module.exports = app;
