const express = require('express');
const router = express.Router();
const { skinConcernController } = require('../controllers');

// Get all skin concerns
router.get('/', skinConcernController.getAllSkinConcerns);

// Get skin concern by id
router.get('/:id', skinConcernController.getSkinConcernById);

// Create skin concern
router.post('/', skinConcernController.createSkinConcern);

// Update skin concern
router.put('/:id', skinConcernController.updateSkinConcern);

// Delete skin concern
router.delete('/:id', skinConcernController.deleteSkinConcern);

module.exports = router;