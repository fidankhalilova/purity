const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    inStock: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],

    productColors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductColor'
    }],
    productSizes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductSize'
    }],

    skinColors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkinColor'
    }],
    skinShades: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkinShade'
    }],
    skinTypes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkinType'
    }],
    skinConcerns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkinConcern'
    }],

    collection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],

    homeSections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HomeSection'
    }],

    pairsWell: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    boughtTogether: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    similarProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],

    badges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge'
    }],
    benefits: [{
        type: String
    }],
    actionImages: [{
        type: String
    }],
    productInfo: String,
    howToUse: String,
    ingredients: String,
    glowIngredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GlowIngredient'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    discount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount'
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        default: null
    },
    formulation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Formulation',
        default: null
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);