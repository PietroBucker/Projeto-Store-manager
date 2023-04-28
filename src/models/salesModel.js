const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT s.id, s.date, sp.product_id, sp.quantity 
      FROM sales_products AS sp
      INNER JOIN sales AS s
      ON s.id = sp.sale_id;`,
  );
  const allProducts = result.map((element) => ({
    saleId: element.id,
    date: element.date,
    productId: element.product_id,
    quantity: element.quantity,
  }));
  return allProducts;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity FROM sales_products AS sp
      INNER JOIN sales AS s
      ON s.id = sp.sale_id
      WHERE s.id = (?) ;`,
    [id],
  );

  const ProductsById = result.map((element) => ({
    date: element.date,
    productId: element.product_id,
    quantity: element.quantity,
  }));

  return ProductsById;
};

// FAZER O END POINT DE CADASTRO DE VENDAS 
// SALES VAI USAR AS DUAS TABELAS JUNTAS.

const insert = async (saleData) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW())',
  );
  await saleData.map((element) => connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [insertId, ...Object.values(element)],
    ));
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};