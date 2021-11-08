import express from 'express';
import cors from 'cors';
import connection from './database/database.js';

const app = express();

app.use(cors());
app.use(express.json());



console.log(process.env.DB_PASSWORD);


export default app;