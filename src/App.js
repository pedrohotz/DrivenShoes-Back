
import express from 'express';
import cors from 'cors';
import connection from './database/database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/user',(req,res) => {

    res.sendStatus(200);
})
app.post('/product',async (req,res) => {
    let name = "Tenis maneiro"
    await connection.query('INSERT INTO products (name) VALUES ($1)',[name]);
    res.sendStatus(200);
})

console.log(process.env.DB_PASSWORD);


export default app;