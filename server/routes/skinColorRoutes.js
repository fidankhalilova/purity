const express = require('express');
const router = express.Router();
const { skinColorController } = require('../controllers');

// Get all skin colors
router.get('/', skinColorController.getAllSkinColors);

// Get skin color by id
router.get('/:id', skinColorController.getSkinColorById);

// Create skin color
router.post('/', skinColorController.createSkinColor);

// Update skin color
router.put('/:id', skinColorController.updateSkinColor);

// Delete skin color
router.delete('/:id', skinColorController.deleteSkinColor);

module.exports = router;