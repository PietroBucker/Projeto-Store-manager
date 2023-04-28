const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const allProducts = await productsService.findAll();
  res.status(200).json(allProducts.message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const productById = await productsService.findById(id);
  if (productById.type) {
    return res.status(404).json({ message: productById.message });
  }
  res.status(200).json(productById.message);
};

const insert = async (req, res) => {
  const { body } = req;
  const insertId = await productsService.insert(body);
  res.status(201).json({ id: insertId.message, name: body.name });
};
module.exports = {
  findAll,
  findById,
  insert,
};