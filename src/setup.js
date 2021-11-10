import dotenv from 'dotenv';

console.log("testando");
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({
    path: envFile
});