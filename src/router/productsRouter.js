const express = require('express');
const { productsController } = require('../controllers');
const { validateName, validateUpDateById } = require('../middleware/validations');

const router = express.Router();

router.get('/search', productsController.findByQuery);

router.get('/:id', productsController.findById);

router.get('/', productsController.findAll);

router.post('/', validateName, productsController.insert);

router.put('/:id', validateName, validateUpDateById, productsController.upDate);

router.delete('/:id', productsController.productDelete);

module.exports = router;