const { salesService } = require('../services');

const findAll = async (_req, res) => {
  const allSales = await salesService.findAll();
  return res.status(200).json(allSales.message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const salesById = await salesService.findById(id);
  console.log(salesById);
  if (salesById.type) {
    return res.status(404).json({ message: salesById.message });
  }
  return res.status(200).json(salesById.message);
};

const insert = async (req, res) => {
  const { body } = req;
  const insertId = await salesService.insert(body);
  return res.status(201).json({
    id: insertId.message,
    itemsSold: [...body],
  });
};

module.exports = {
  findAll,
  findById,
  insert,
};