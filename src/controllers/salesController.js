const { salesService } = require('../services');

const findAll = async (_req, res) => {
  const allSales = await salesService.findAll();
  return res.status(200).json(allSales.message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const salesById = await salesService.findById(id);
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

const upDate = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const result = await salesService.upDate(id, body);
 if (result.type) {
    return res.status(404).json({ message: result.message });
 }
  return res.status(200).json({ saleId: id, itemsUpdated: body });
};

const salesDelete = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.salesDelete(id);
  if (result.type) {
    return res.status(404).json({ message: result.message });
  }
    return res.status(204).json(result);
};

module.exports = {
  findAll,
  findById,
  insert,
  upDate,
  salesDelete,
};