const express = require('express');
const router = express.Router();
const { productController } = require('../controllers');

// Get all products (with pagination)
router.get('/', productController.getAllProducts);

// Get product by MongoDB _id
router.get('/:id', productController.getProductById);

// Create new product
router.post('/', productController.createProduct);

// Update product
router.put('/:id', productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;