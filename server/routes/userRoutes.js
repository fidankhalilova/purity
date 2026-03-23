// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { uploadSingle } = require('../middleware/uploadMiddleware');

// IMPORTANT: Specific routes must come BEFORE parameter routes
router.patch('/:id/avatar', uploadSingle('avatar'), userController.updateAvatar);
router.patch('/:id/password', userController.updatePassword);

// Address routes
router.post('/:id/addresses', userController.addAddress);
router.put('/:userId/addresses/:addressId', userController.updateAddress);
router.delete('/:userId/addresses/:addressId', userController.deleteAddress);

// Wishlist routes
router.post('/:userId/wishlist/:productId', userController.addToWishlist);
router.delete('/:userId/wishlist/:productId', userController.removeFromWishlist);

// User CRUD routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.patch('/:id/status', userController.updateUserStatus);
router.delete('/:id', userController.deleteUser);

module.exports = router;