const mongoose = require('mongoose');

const formulationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

formulationSchema.virtual('productCount', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'formulation',
    count: true
});

formulationSchema.set('toJSON', { virtuals: true });
formulationSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Formulation', formulationSchema);