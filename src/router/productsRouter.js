const express = require('express');
const { productsController } = require('../controllers');
const { validateName } = require('../middleware/validations');

const router = express.Router();

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.post('/', validateName, productsController.insert);

router.put('/:id', productsController.upDate);
module.exports = router;