// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Public routes (if any) - none here, all require auth

// Admin only routes
router.get('/', verifyToken, verifyAdmin, orderController.getAllOrders);
router.patch('/:id/status', verifyToken, verifyAdmin, orderController.updateOrderStatus);

// User routes (require auth)
router.get('/user/:userId', verifyToken, orderController.getUserOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.post('/', verifyToken, orderController.createOrder);
router.post('/:id/cancel', verifyToken, orderController.cancelOrder);

module.exports = router;