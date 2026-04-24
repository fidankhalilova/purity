const express = require('express');
const router = express.Router();
const { homeSectionController } = require('../controllers');

// Get all home sections
router.get('/', homeSectionController.getAllHomeSections);

// Get home section by id
router.get('/:id', homeSectionController.getHomeSectionById);

// Create home section
router.post('/', homeSectionController.createHomeSection);

// Update home section
router.put('/:id', homeSectionController.updateHomeSection);

// Delete home section
router.delete('/:id', homeSectionController.deleteHomeSection);

module.exports = router;