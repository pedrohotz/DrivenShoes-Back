/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';

describe('GET /categories', () => {
  it('always returns 200', async () => {
    const result = await supertest(app).get('/categories');
    const { status } = result;
    expect(status).toEqual(200);
  });
});
