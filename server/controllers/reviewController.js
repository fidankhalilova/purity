// controllers/reviewController.js
const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');

// Get all reviews (admin)
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'name email')
            .populate('product', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error('Error in getAllReviews:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get review by ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('user', 'name email')
            .populate('product', 'name');
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(200).json({ success: true, data: review });
    } catch (error) {
        console.error('Error in getReviewById:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get reviews by product
const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId,
            status: 'published'
        })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error('Error in getReviewsByProduct:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update product rating and review count
const updateProductRating = async (productId) => {
    try {
        const reviews = await Review.find({
            product: productId,
            status: 'published'
        });

        const reviewCount = reviews.length;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

        await Product.findByIdAndUpdate(productId, {
            rating: averageRating,
            reviewCount: reviewCount
        });
    } catch (error) {
        console.error('Error updating product rating:', error);
    }
};

// Create product review
const createProductReview = async (req, res) => {
    try {
        const { productId, rating, title, body, images } = req.body;
        const userId = req.userId;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if user has already reviewed this product
        const existingReview = await Review.findOne({
            user: userId,
            product: productId,
            status: 'published'
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You have already reviewed this product'
            });
        }

        // Get user info
        const user = await User.findById(userId);

        // Create the review
        const review = new Review({
            user: userId,
            product: productId,
            author: user.name,
            rating,
            title,
            body,
            images: images || [],
            status: 'published'
        });

        await review.save();

        // Add review reference to product
        product.reviews.push(review._id);
        await product.save();

        // Update product rating and review count
        await updateProductRating(productId);

        await review.populate('user', 'name email');

        res.status(201).json({ success: true, data: review });
    } catch (error) {
        console.error('Error in createProductReview:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Create general review (for admin testimonials - no product)
const createGeneralReview = async (req, res) => {
    try {
        const { author, rating, title, body, images, date, status } = req.body;

        const review = new Review({
            author: author || 'Anonymous',
            rating: rating || 5,
            title: title || '',
            body: body || '',
            images: images || [],
            date: date || new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
            status: status || 'published'
        });

        await review.save();
        res.status(201).json({ success: true, data: review });
    } catch (error) {
        console.error('Error in createGeneralReview:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Main create review - handles both types
const createReview = async (req, res) => {
    try {
        // If productId exists, it's a product review
        if (req.body.productId) {
            return await createProductReview(req, res);
        }
        // Otherwise it's a general testimonial
        return await createGeneralReview(req, res);
    } catch (error) {
        console.error('Error in createReview:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update review
const updateReview = async (req, res) => {
    try {
        const { rating, title, body, images, status } = req.body;
        const userId = req.userId;

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        // Check if user is owner or admin
        if (review.user && review.user.toString() !== userId && req.userRole !== 'admin') {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }

        const oldRating = review.rating;

        if (rating !== undefined) review.rating = rating;
        if (title !== undefined) review.title = title;
        if (body !== undefined) review.body = body;
        if (images !== undefined) review.images = images;
        if (status !== undefined) review.status = status;

        await review.save();

        // If rating changed and it's a product review, update product rating
        if (review.product && rating !== undefined && rating !== oldRating) {
            await updateProductRating(review.product);
        }

        res.status(200).json({ success: true, data: review });
    } catch (error) {
        console.error('Error in updateReview:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update review status (soft delete)
const updateReviewStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['published', 'deleted'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        review.status = status;
        await review.save();

        // If it's a product review, update product rating
        if (review.product) {
            await updateProductRating(review.product);
        }

        res.status(200).json({ success: true, data: review });
    } catch (error) {
        console.error('Error in updateReviewStatus:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete review (permanent delete)
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        const productId = review.product;

        // Remove review reference from product if it exists
        if (productId) {
            await Product.findByIdAndUpdate(productId, {
                $pull: { reviews: review._id }
            });
            await updateProductRating(productId);
        }

        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error in deleteReview:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    getReviewsByProduct,
    createReview,
    updateReview,
    updateReviewStatus,
    deleteReview
};