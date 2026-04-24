const express = require('express');
const router = express.Router();
const { skinShadeController } = require('../controllers');

// Get all skin shades
router.get('/', skinShadeController.getAllSkinShades);

// Get skin shade by id
router.get('/:id', skinShadeController.getSkinShadeById);

// Create skin shade
router.post('/', skinShadeController.createSkinShade);

// Update skin shade
router.put('/:id', skinShadeController.updateSkinShade);

// Delete skin shade
router.delete('/:id', skinShadeController.deleteSkinShade);

module.exports = router;