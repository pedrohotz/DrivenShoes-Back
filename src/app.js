import express from 'express';
import cors from 'cors';
import getProducts from './controllers/products.js';
import getCategories from './controllers/categories.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/products', getProducts);
app.get('/categories', getCategories);

export default app;
