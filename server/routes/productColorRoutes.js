const express = require('express');
const router = express.Router();
const { productColorController } = require('../controllers');

// Get all product colors
router.get('/', productColorController.getAllProductColors);

// Get product color by id
router.get('/:id', productColorController.getProductColorById);

// Create product color
router.post('/', productColorController.createProductColor);

// Update product color
router.put('/:id', productColorController.updateProductColor);

// Delete product color
router.delete('/:id', productColorController.deleteProductColor);

module.exports = router;