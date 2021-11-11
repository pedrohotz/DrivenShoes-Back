/* eslint-disable import/named */
import express from 'express';
import cors from 'cors';
import getProducts from './controllers/products.js';
import getCategories from './controllers/categories.js';
import { getCheckout, postCheckout } from './controllers/checkout.js';
import { login } from './controllers/login.js';
import { register } from './controllers/register.js';
import getCategoryProducts from './controllers/categoryProducts.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/products', getProducts);
app.get('/categories', getCategories);
app.get('/category-products', getCategoryProducts);
app.post('/sign-in', login);
app.post('/sign-up', register);
app.get('/checkout', getCheckout);
app.post('/checkout', postCheckout);

export default app;
