const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');

router.get('/', discountController.getAllDiscounts);
router.get('/:id', discountController.getDiscountById);
router.get('/code/:code', discountController.getDiscountByCode);
router.post('/', discountController.createDiscount);
router.put('/:id', discountController.updateDiscount);
router.patch('/:id/status', discountController.updateDiscountStatus);
router.delete('/:id', discountController.deleteDiscount);

module.exports = router;