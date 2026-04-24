const mongoose = require('mongoose');

const productColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    colorCode: {
        type: String,
        trim: true
    },
    hexCode: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ProductColor', productColorSchema);