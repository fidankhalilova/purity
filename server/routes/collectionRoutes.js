const express = require('express');
const router = express.Router();
const { collectionController } = require('../controllers');

// Get all collections
router.get('/', collectionController.getAllCollections);

// Get collection by id
router.get('/:id', collectionController.getCollectionById);

// Create collection
router.post('/', collectionController.createCollection);

// Update collection
router.put('/:id', collectionController.updateCollection);

// Delete collection
router.delete('/:id', collectionController.deleteCollection);

module.exports = router;