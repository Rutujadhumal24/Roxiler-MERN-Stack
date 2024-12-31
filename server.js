
// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionsRoute = require('./routes/transactions');

// Initialize the Express application
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/transactions', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use transactions route
app.use('/api/transactions', transactionsRoute);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
