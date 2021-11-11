/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { registerValidation } from '../validation/validation.js';

async function register(req, res) {
  const {
    nome,
    email,
    password,
  } = req.body;

  const errors = registerValidation.validate({
    nome,
    email,
    password,
  }).error;
  if (errors) {
    return res.sendStatus(400);
  }

  const user = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
  if (user.rowCount > 0) {
    return res.sendStatus(400);
  }

  try {
    const hash = bcrypt.hashSync(password, 12);
    await connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)', [nome, email, hash]);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export {
  register,
};
