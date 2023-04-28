const express = require('express');
const { productsController } = require('../controllers');
const { validateName } = require('../middleware/validations');

const router = express.Router();

router.get('/', productsController.findAll);

router.get('/:id', validateName, productsController.findById);

router.post('/', validateName, productsController.insert);
module.exports = router;