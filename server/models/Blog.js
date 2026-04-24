const mongoose = require('mongoose');

const contentBlockSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['h1', 'h2', 'h3', 'h4', 'p', 'intro', 'tip', 'image', 'quote', 'list', 'link-p'],
        required: true
    },
    text: {
        type: String
    },
    src: {
        type: String
    },
    alt: {
        type: String
    },
    caption: {
        type: String
    },
    items: [{
        type: String
    }],
    parts: [{
        text: String,
        bold: Boolean,
        italic: Boolean,
        underline: Boolean,
        href: String
    }],
    order: {
        type: Number,
        default: 0
    }
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        default: 'Admin'
    },
    category: {
        type: String,
        required: true,
        enum: ['Tips', 'Reviews', 'Guide', 'Holidays', 'Gifting', 'Self-Care', 'Trends', 'Ingredients']
    },
    featuredImage: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true,
        maxlength: 200
    },
    content: [contentBlockSchema],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String
    }],
    seoTitle: String,
    seoDescription: String,
    publishedAt: {
        type: Date
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Blog', blogSchema);