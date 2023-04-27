const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  console.log(result);
  return result;
};

module.exports = {
  findAll,
};