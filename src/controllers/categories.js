import connection from '../database/database.js';

async function getCategories(req, res) {
  try {
    const result = await connection.query('SELECT * FROM "product_category"');
    res.send(result.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export default getCategories;
