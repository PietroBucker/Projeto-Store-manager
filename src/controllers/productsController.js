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

const findByQuery = async (req, res) => {
  const { q } = req.query; 
  const result = await productsService.findByQuery(q);
  if (result.type) {
    return res.status(400).json({ message: result.message });
  }
    return res.status(200).json(result.message);
};

const insert = async (req, res) => {
  const { body } = req;
  const insertId = await productsService.insert(body);
  res.status(201).json({ id: insertId.message, name: body.name });
};

const upDate = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await productsService.upDate(id, name);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
    return res.status(200).json({ id, name });
};

const productDelete = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.productDelete(id);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
    return res.status(204).json(result);
};

module.exports = {
  findAll,
  findById,
  findByQuery,
  insert,
  upDate,
  productDelete,
};