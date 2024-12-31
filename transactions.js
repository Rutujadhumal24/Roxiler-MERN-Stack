
// Import required modules
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/Transaction');

// API to seed the database with data from a third-party API
router.get('/seed', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany({}); // Clear existing data
        await Transaction.insertMany(response.data); // Insert new data
        res.status(200).send('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
        res.status(500).send(err.message);
    }
});

// API to list transactions with search and pagination
router.get('/', async (req, res) => {
    const { page = 1, per_page = 10, search = '' } = req.query;

    // Build the search query
    const query = search ? {
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } },
        ],
    } : {};

    try {
        // Fetch transactions with pagination
        const transactions = await Transaction.find(query)
            .skip((page - 1) * per_page)
            .limit(Number(per_page));
        res.status(200).json(transactions); // Return the transactions
    } catch (err) {
        console.error('Error fetching transactions:', err);
        res.status(500).send(err.message);
    }
});

module.exports = router;
