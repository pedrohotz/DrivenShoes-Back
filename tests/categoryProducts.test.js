/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';

describe('GET /category-products', () => {
  it('returns 200 for valid search', async () => {
    const body = {
      name: "corrida",
    };

    const result = await supertest(app).get('/category-products').send(body);
    const { status } = result;
    expect(status).toEqual(200);
  });

  it('returns 400 for invalid search', async () => {
    const body = {
      name: "co",
    };

    const result = await supertest(app).get('/category-products').send(body);
    const { status } = result;
    expect(status).toEqual(400);
  });
});
