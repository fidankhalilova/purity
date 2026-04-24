const mongoose = require('mongoose');

const skinConcernSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    skinType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkinType'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('SkinConcern', skinConcernSchema);