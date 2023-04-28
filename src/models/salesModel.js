const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM sales;',
  );
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM sales WHERE id = ?',
    [id],
  );
  return result;
};

// FAZER O END POINT DE CADASTRO DE VENDAS 
// SALES VAI USAR AS DUAS TABELAS JUNTAS.

module.exports = {
  findAll,
  findById,
};