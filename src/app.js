import express from 'express';
import cors from 'cors';
import { getCheckout, postCheckout } from './controllers/checkout.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/checkout', getCheckout);
app.post('/checkout', postCheckout);

export default app;