const { productsService } = require('../services');

const validateName = (req, res, next) => {
  const { body } = req;
  if (!('name' in body)) return res.status(400).json({ message: '"name" is required' });

  if (body.name.length < 6) {
 return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
}
  return next();
};

const validateSalesKey = (req, res, next) => {
  const { body } = req;

  const validaProdKey = body.some((element) => !('productId' in element));
  const validaQuantKey = body.some((element) => !('quantity' in element));

  if (validaProdKey) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (validaQuantKey) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  return next();
};

const validadeQuantity = (req, res, next) => {
   const { body } = req;

  const validaQuant = body.some((element) => element.quantity <= 0);

  if (validaQuant) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

const vlaidadeProductId = async (req, res, next) => {
  const { body } = req;
  const { message: products } = await productsService.findAll();
  const searchProdcts = products.map((product) => product.id);

  const validaProduct = body.every((element) => searchProdcts.includes(element.productId));

  if (!validaProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return next();
};

const validateUpDateById = async (req, res, next) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
   if (type) {
     return res.status(404).json({ message });
  }
  return next();
};

module.exports = {
  validateName,
  validateSalesKey,
  validadeQuantity,
  vlaidadeProductId,
  validateUpDateById,
};
