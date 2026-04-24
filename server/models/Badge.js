const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Badge', badgeSchema);