const mongoose = require('mongoose');

const skinTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    skinConcerns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkinConcern'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('SkinType', skinTypeSchema);