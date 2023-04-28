const express = require('express');
const { salesController } = require('../controllers');
const { validateSalesKey,
  validadeQuantity, vlaidadeProductId } = require('../middleware/validations');

const router = express.Router();

router.get('/:id', salesController.findById);

router.get('/', salesController.findAll);

router.post('/', validateSalesKey, validadeQuantity, vlaidadeProductId, salesController.insert);

module.exports = router;