/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';

describe('GET /category-products', () => {
  beforeAll(async () => {
    connection.query("INSERT INTO product_category (name) VALUES ('teste')");
    connection.query(`INSERT INTO product (name, price, "category_Id", description, "url_image") VALUES ('Tênis Brabo', 199.99, 1, 'teste', 'https://static.netshoes.com.br/produtos/tenis-nike-downshifter-11-masculino/26/HZM-5208-026/HZM-5208-026_zoom1.jpg?ts=1630603834&')`);
  });

  it('returns 200 for valid search', async () => {
    const body = {
      name: 'teste',
    };

    const result = await supertest(app).post('/category-products').send(body);
    const { status } = result;
    expect(status).toEqual(200);
  });

  it('returns 400 for invalid search', async () => {
    const body = {
      name: 'te',
    };

    const result = await supertest(app).post('/category-products').send(body);
    const { status } = result;
    expect(status).toEqual(400);
  });

  afterAll(async () => {
    connection.query("DELETE FROM product_category WHERE name = 'teste'");
    connection.query("DELETE FROM product WHERE name = 'Tênis Brabo'");
  });
});
