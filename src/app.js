import express from 'express';
import cors from 'cors';

import { getCheckout, postCheckout } from './controllers/checkout.js';
import { postPayment, getCards } from './controllers/payment.js';

import { login } from './controllers/login.js';
import { register } from './controllers/register.js';


const app = express();

app.use(cors());
app.use(express.json());


app.get('/checkout', getCheckout);
app.post('/checkout', postCheckout);


app.post('/sign-in',login);
app.post('/sign-up',register);

app.post('/payment', postPayment);
app.get('/payment', getCards);



export default app;