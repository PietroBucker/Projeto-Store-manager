const { productsModel } = require('../models');

const findAll = async () => {
  const allProducts = await productsModel.findAll();
  return { type: null, message: allProducts };
};

const findById = async (id) => {
  const productById = await productsModel.findById(id);
  if (!productById) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  return { type: null, message: productById };
};

const insert = async (productDate) => {
  const insertId = await productsModel.insert(productDate);
  return { type: null, message: insertId };
};

const upDate = async (id, name) => {
  const affectedRows = await productsModel.upDate(id, name);
  if (affectedRows === 0) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
    return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  insert,
  upDate,
};