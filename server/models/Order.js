const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String
    },
    discountApplied: {
        type: Number,
        default: 0
    }
});

const addressSchema = new mongoose.Schema({
    label: {
        type: String,
        enum: ['Home', 'Work', 'Other'],
        default: 'Home'
    },
    fullName: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
});

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        sparse: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    subtotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['paid', 'getting_ready', 'shipped', 'delivered', 'cancelled'],
        default: 'paid'
    },
    shippingAddress: addressSchema,
    billingAddress: addressSchema,
    paymentMethod: {
        type: String,
        enum: ['card', 'paypal', 'bank_transfer'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    trackingNumber: {
        type: String
    },
    notes: {
        type: String
    },
    couponCode: {
        type: String
    },
    orderedAt: {
        type: Date,
        default: Date.now
    },
    deliveredAt: {
        type: Date
    },
    cancelledAt: {
        type: Date
    }
}, {
    timestamps: true
});

orderSchema.pre('save', async function () {
    if (this.orderNumber) {
        return;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

    this.orderNumber = `ORD-${year}${month}${day}-${random}`;
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;