const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.get('/product/:productId', reviewController.getReviewsByProduct);

// Protected routes - user must be logged in
router.post('/', verifyToken, reviewController.createReview);
router.put('/:id', verifyToken, reviewController.updateReview);

// Admin only routes (using verifyAdmin)
router.patch('/:id/status', verifyToken, verifyAdmin, reviewController.updateReviewStatus);
router.delete('/:id', verifyToken, verifyAdmin, reviewController.deleteReview);

module.exports = router;