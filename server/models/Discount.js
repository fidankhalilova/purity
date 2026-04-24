const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    value: {
        type: Number,
        required: true,
        min: 0
    },
    uses: {
        type: Number,
        default: 0
    },
    maxUses: {
        type: Number,
        required: true,
        min: 1
    },
    expires: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'disabled'],
        default: 'active'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null,
        sparse: true
    }
}, {
    timestamps: true
});

discountSchema.virtual('formattedValue').get(function () {
    return this.type === 'percentage' ? `${this.value}%` : `$${this.value.toFixed(2)}`;
});

discountSchema.virtual('formattedExpiry').get(function () {
    if (!this.expires) return '';
    const date = new Date(this.expires);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
});

discountSchema.set('toJSON', { virtuals: true });
discountSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Discount', discountSchema);