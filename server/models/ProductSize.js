const mongoose = require('mongoose');

const productSizeSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
        trim: true
    },
    ml: {
        type: Number, // Size in ml
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    sku: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ProductSize', productSizeSchema);