const { salesModel } = require('../models');

const findAll = async () => {
  const allSales = await salesModel.findAll();
  return { type: null, message: allSales };
};

const findById = async (id) => {
  const salesById = await salesModel.findById(id);
  if (salesById.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: salesById };
};

const insert = async (saleData) => {
  const insertId = await salesModel.insert(saleData);
    return { type: null, message: insertId };
};

module.exports = {
  findAll,
  findById,
  insert,
};
