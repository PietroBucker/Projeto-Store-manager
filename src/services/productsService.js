const { productsModel } = require('../models');

const findAll = async () => {
  const allProducts = await productsModel.findAll();
  return allProducts;
};

const findById = async (id) => {
  const productById = await productsModel.findById(id);
  return productById;
};

module.exports = {
  findAll,
  findById,
};