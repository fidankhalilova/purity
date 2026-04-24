const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Get by custom ID field (e.g., "prd-123456789-abc123")
router.get('/id/:id', productController.getProductByCustomId);

// Get by slug
router.get('/slug/:slug', productController.getProductBySlug);

// Get all products
router.get('/', productController.getAllProducts);

// Get featured products
router.get('/featured', productController.getFeaturedProducts);

// Get new arrivals
router.get('/new-arrivals', productController.getNewArrivals);

// Get related products
router.get('/related/:productId', productController.getRelatedProducts);

// Get by MongoDB _id
router.get('/:id', productController.getProductById);

// Admin only routes
router.post('/', verifyToken, verifyAdmin, productController.createProduct);
router.put('/:id', verifyToken, verifyAdmin, productController.updateProduct);
router.patch('/:id', verifyToken, verifyAdmin, productController.updateProduct);
router.delete('/:id', verifyToken, verifyAdmin, productController.deleteProduct);
router.post('/bulk-delete', verifyToken, verifyAdmin, productController.bulkDelete);

module.exports = router;