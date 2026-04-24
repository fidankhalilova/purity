const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

const cartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    sizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductSize' },
    colorId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductColor' },
    size: { type: String },
    color: { type: String },
    addedAt: { type: Date, default: Date.now }
});


const notificationSettingsSchema = new mongoose.Schema({
    orderUpdates: { type: Boolean, default: true },
    shippingDelivery: { type: Boolean, default: true },
    promotionsOffers: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: false },
    smsNotifications: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    googleId: { type: String },
    avatar: { type: String, default: '' },
    phone: { type: String },
    birthday: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'other' },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
    totalSpent: { type: Number, default: 0 },
    cart: [cartItemSchema],
    orderCount: { type: Number, default: 0 },
    addresses: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    notificationSettings: { type: notificationSettingsSchema, default: () => ({}) },
    displayLanguage: { type: String, enum: ['en', 'az', 'ru'], default: 'en' },
    refreshToken: { type: String, select: false },
    lastLogin: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerified: { type: Boolean, default: false },
    verificationToken: String
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (this.isModified('password') && this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.virtual('joined').get(function () {
    if (!this.createdAt) return '';
    return this.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);