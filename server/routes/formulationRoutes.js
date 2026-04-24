const express = require('express');
const router = express.Router();
const formulationController = require('../controllers/formulationController');

router.get('/', formulationController.getAllFormulations);
router.get('/:id', formulationController.getFormulationById);
router.get('/:id/products', formulationController.getProductsByFormulation);
router.post('/', formulationController.createFormulation);
router.put('/:id', formulationController.updateFormulation);
router.patch('/:id/toggle-active', formulationController.toggleActive);
router.delete('/:id', formulationController.deleteFormulation);

module.exports = router;