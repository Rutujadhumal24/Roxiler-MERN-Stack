
// Import Mongoose library
const mongoose = require('mongoose');

// Define the schema for transactions
const TransactionSchema = new mongoose.Schema({
    title: { type: String, required: true },          // Product title
    description: { type: String, required: true },   // Product description
    price: { type: Number, required: true },         // Product price
    dateOfSale: { type: Date, required: true },      // Date of sale
    sold: { type: Boolean, required: true },         // Sold status
    category: { type: String, required: true }       // Product category
});

// Export the transaction model
module.exports = mongoose.model('Transaction', TransactionSchema);
