/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';
import { loginValidation } from '../validation/validation.js';

async function login(req, res) {
  const {
    email,
    password,
  } = req.body;

  const errors = loginValidation.validate({
    email,
    password,
  }).error;

  if (errors) {
    return res.sendStatus(400);
  }

  try {
      const user = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
      const name = user.rows[0].name;
      if (user.rowCount === 0) {
        return res.sendStatus(404);
      }
      const encryptedPass = user.rows[0].password;
      const isValid = bcrypt.compareSync(password, encryptedPass);
      if (!isValid) {
        return res.sendStatus(401);
      }
      const token = uuid();
      await connection.query('INSERT INTO sessions (user_id,token) VALUES ($1,$2)', [user.rows[0].id, token]);

      res.send({
        name,
        token,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  
}

export {
  login,
};
