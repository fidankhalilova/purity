const express = require('express');
const router = express.Router();
const { productSizeController } = require('../controllers');

// Get all product sizes
router.get('/', productSizeController.getAllProductSizes);

// Get product size by id
router.get('/:id', productSizeController.getProductSizeById);

// Create product size
router.post('/', productSizeController.createProductSize);

// Update product size
router.put('/:id', productSizeController.updateProductSize);

// Delete product size
router.delete('/:id', productSizeController.deleteProductSize);

module.exports = router;