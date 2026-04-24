const express = require('express');
const router = express.Router();
const { skinTypeController } = require('../controllers');

// Get all skin types
router.get('/', skinTypeController.getAllSkinTypes);

// Get skin type by id
router.get('/:id', skinTypeController.getSkinTypeById);

// Create skin type
router.post('/', skinTypeController.createSkinType);

// Update skin type
router.put('/:id', skinTypeController.updateSkinType);

// Delete skin type
router.delete('/:id', skinTypeController.deleteSkinType);

module.exports = router;