const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

router.use(verifyToken);

router.get('/:userId', cartController.getCart);
router.post('/:userId/add', cartController.addToCart);
router.put('/:userId/items/:itemId', cartController.updateCartItem);
router.delete('/:userId/items/:itemId', cartController.removeCartItem);

module.exports = router;