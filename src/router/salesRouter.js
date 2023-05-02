const express = require('express');
const { salesController } = require('../controllers');
const { validateSalesKey,
  validadeQuantity, vlaidadeProductId } = require('../middleware/validations');

const router = express.Router();

router.get('/:id', salesController.findById);

router.get('/', salesController.findAll);

router.post('/', validateSalesKey, validadeQuantity, vlaidadeProductId, salesController.insert);

router.put('/:id', validateSalesKey, validadeQuantity, vlaidadeProductId, salesController.upDate);

router.delete('/:id', salesController.salesDelete);

module.exports = router;