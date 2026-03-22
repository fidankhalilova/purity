const mongoose = require('mongoose');

const glowIngredientSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('GlowIngredient', glowIngredientSchema);