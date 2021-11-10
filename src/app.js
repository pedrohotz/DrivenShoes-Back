import express from 'express';
import cors from 'cors';
import { login } from './controllers/login.js';
import { register } from './controllers/register.js';

const app = express();

app.use(cors());
app.use(express.json());


app.post('/sign-in',login);
app.post('/sign-up',register);


export default app;