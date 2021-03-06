/* eslint-disable no-undef */
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/app.js';
import connection from '../src/database/database.js';

describe('POST /sign-in', () => {
  const password = bcrypt.hashSync('senhadojoaozin', 12);
  beforeAll(async () => {
    connection.query(`INSERT INTO users (name,email,password) VALUES ('joaozin','joaozindoteste@email.com','${password}')`);
  });

  it('returns 200 for valid login', async () => {
    const body = {
      email: "joaozindoteste@email.com",
      password: "senhadojoaozin",
    };
    const result = await supertest(app).post('/sign-in').send(body);
    expect(result.status).toEqual(200);
  });

  it('returns 404 for invalid login', async () => {
    const body = {
      email: "joaozin2@email.com",
      password: "123456",
    };
    const result = await supertest(app).post('/sign-in').send(body);
    expect(result.status).toEqual(404);
  });

  afterAll(async () => {
    connection.query(`DELETE FROM users WHERE name= 'joaozin'`);
  });
});

describe('POST /sign-up', () => {
  it('returns 201 for valid register', async () => {
    const body = {
      nome: 'Joaozin',
      email: 'joaozin@email.com',
      password: '123456',
    };
    const result = await supertest(app).post('/sign-up').send(body);
    expect(result.status).toEqual(201);
  });

  it('returns 400 for invalid register', async () => {
    const body = {
      nome: 'Joaozin',
      email: 'joaozin.com',
      password: '123456',
    };
    const result = await supertest(app).post('/sign-up').send(body);
    expect(result.status).toEqual(400);
  });

  afterAll(async () => {
    connection.query('DELETE FROM users WHERE name=\'Joaozin\'');
  });
});
