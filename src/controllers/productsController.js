const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const allProducts = await productsService.findAll();
  res.status(200).json(allProducts);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const productById = await productsService.findById(id);
  if (!productById) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(productById);
};

module.exports = {
  findAll,
  findById,
};