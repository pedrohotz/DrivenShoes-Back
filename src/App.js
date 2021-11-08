
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/user',(req,res) => {

    res.sendStatus(200);
})
console.log(process.env.DB_DATABASE);
export default app;