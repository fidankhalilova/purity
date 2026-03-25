// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        sparse: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        sparse: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    date: {
        type: String,
        default: () => {
            const date = new Date();
            return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        }
    },
    status: {
        type: String,
        enum: ['published', 'deleted'],
        default: 'published'
    }
}, {
    timestamps: true
});

// Index for faster queries
reviewSchema.index({ product: 1, status: 1 });
reviewSchema.index({ user: 1, product: 1 });

module.exports = mongoose.model('Review', reviewSchema);