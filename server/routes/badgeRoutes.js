const express = require('express');
const router = express.Router();
const { badgeController } = require('../controllers');

// Get all badges
router.get('/', badgeController.getAllBadges);

// Get badge by id
router.get('/:id', badgeController.getBadgeById);

// Create badge
router.post('/', badgeController.createBadge);

// Update badge
router.put('/:id', badgeController.updateBadge);

// Delete badge
router.delete('/:id', badgeController.deleteBadge);

module.exports = router;