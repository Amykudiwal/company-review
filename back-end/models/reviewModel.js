const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    fullName: String,
    subject: String,
    reviewText: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Review', reviewSchema);
