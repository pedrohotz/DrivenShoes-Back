import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? '.env' : '.env.test';

dotenv.config({
    path: envFile
});