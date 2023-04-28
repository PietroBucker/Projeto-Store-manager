const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return result;
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return result;
};

const insert = async (productDate) => {
  const colums = Object.keys(productDate);
  const placehold = colums.map(() => '?').join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${colums.join(', ')}) VALUE (${placehold})`,
    [...Object.values(productDate)],
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};

// const teste = { name: 'pietro', teste: 'teste' };
// const teste2 = Object.keys(teste);
// console.log(teste2);
// const teste3 = teste2.map((_colum) => ('?')).join(', ');
// console.log(teste3);