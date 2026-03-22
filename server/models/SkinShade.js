const mongoose = require('mongoose');

const skinShadeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    colorCode: {
        type: String, // Hex code or color value
        trim: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SkinShade', skinShadeSchema);