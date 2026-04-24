const express = require('express');
const router = express.Router();
const { tagController } = require('../controllers');

// Get all tags
router.get('/', tagController.getAllTags);

// Get tag by id
router.get('/:id', tagController.getTagById);

// Create tag
router.post('/', tagController.createTag);

// Update tag
router.put('/:id', tagController.updateTag);

// Delete tag
router.delete('/:id', tagController.deleteTag);

module.exports = router;