import dotenv from 'dotenv';

console.log(process.env.NODE_ENV);
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({
    path: envFile
});