const express = require('express');
const { productsController } = require('../controllers');
const { validateName, validateUpDateById } = require('../middleware/validations');

const router = express.Router();

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.post('/', validateName, productsController.insert);

router.put('/:id', validateName, validateUpDateById, productsController.upDate);

module.exports = router;