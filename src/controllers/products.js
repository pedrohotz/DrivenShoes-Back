import connection from '../database/database.js';

async function getProducts(req, res) {
  try {
    const result = await connection.query('SELECT * FROM product');
    res.send(result.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export default getProducts;
