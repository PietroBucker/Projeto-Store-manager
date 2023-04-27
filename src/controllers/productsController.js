const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const allProducts = await productsService.findAll();
  res.status(200).json(allProducts);
};

module.exports = {
  findAll,
};