const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['new', 'best-seller', 'value-set', 'limited-edition', 'featured'],
        required: true
    },
    color: {
        type: String,
        default: '#000000'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tag', tagSchema);