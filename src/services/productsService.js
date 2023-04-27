const { productsModel } = require('../models');

const findAll = async () => {
  const allProducts = await productsModel.findAll();
  return allProducts;
};

module.exports = {
  findAll,
};