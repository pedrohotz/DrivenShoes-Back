import connection from '../database/database.js';
import { categoryValidation } from '../validation/validation.js';

async function getCategoryProducts(req, res) {
  const { body } = req;
  const { name } = body;
  const errors = categoryValidation.validate({
    name,
  }).error;

  if (errors) {
    res.sendStatus(400);
  }

  try {
    const result = await connection.query('SELECT product.* FROM product JOIN "product_category" ON product."category_Id" = "product_category".id WHERE "product_category".name = $1', [body.name]);
    res.send(result.rows);
  } catch (error) {
    res.sendStatus(500);
  }
}

export default getCategoryProducts;
