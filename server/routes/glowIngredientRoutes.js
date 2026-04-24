const express = require('express');
const router = express.Router();
const glowIngredientController = require('../controllers/glowIngredientController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', glowIngredientController.getAllGlowIngredients);
router.get('/:id', glowIngredientController.getGlowIngredientById);

// Admin only routes
router.post('/', verifyToken, verifyAdmin, glowIngredientController.createGlowIngredient);
router.put('/:id', verifyToken, verifyAdmin, glowIngredientController.updateGlowIngredient);
router.delete('/:id', verifyToken, verifyAdmin, glowIngredientController.deleteGlowIngredient);

module.exports = router;