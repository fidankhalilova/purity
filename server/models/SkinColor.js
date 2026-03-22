const mongoose = require('mongoose');

const skinColorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    colorCode: {
        type: String,
        trim: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SkinColor', skinColorSchema);