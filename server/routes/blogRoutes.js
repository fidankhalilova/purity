// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', blogController.getAllBlogs);
router.get('/featured', blogController.getFeaturedBlogs);
router.get('/slug/:slug', blogController.getBlogBySlug);
router.get('/:id/related', blogController.getRelatedBlogs);

// Admin only routes
router.get('/admin/:id', verifyToken, verifyAdmin, blogController.getBlogById);
router.post('/', verifyToken, verifyAdmin, blogController.createBlog);
router.put('/:id', verifyToken, verifyAdmin, blogController.updateBlog);
router.delete('/:id', verifyToken, verifyAdmin, blogController.deleteBlog);

module.exports = router;