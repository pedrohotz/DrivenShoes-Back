import connection from '../database/database.js';
import {cardValidation} from '../validation/validation.js'

async function postPayment (req, res) {

    try {
        const authorization = req.headers['authorization'];
        const token = authorization?.replace('Bearer ', '');

        if(!token) return res.sendStatus(401);


        const result = await connection.query(`
            SELECT * FROM sessions
            WHERE sessions.token = $1
        `, [token]);

        const session = result.rows[0];

        let verifyRegister = await connection.query(`
            SELECT * FROM payment_data WHERE "user_id" = $1
        `, [session.user_id]);
        
        if(verifyRegister.rowCount === 0){
            await connection.query(`
                INSERT INTO payment_data ("user_id") VALUES (${session.user_id})
            `);

            verifyRegister = await connection.query(`
            SELECT * FROM payment_data WHERE "user_id" = $1
        `, [session.user_id]);
        }

        const {
            card_number,
            security_number,
            expiration_date,
            name,
        } = req.body;

        const errors = cardValidation.validate(req.body).error;
        if(errors){
            return res.sendStatus(400);
        }

        const verifyName = await connection.query(`
            SELECT * FROM cards WHERE name = $1
        `, [name]);

        if(verifyName.rowCount !== 0){
            return res.sendStatus(409);
        }

        const verifyCardNumber = await connection.query(`
            SELECT * FROM cards WHERE "card_number" = $1
        `, [card_number]);

        if(verifyCardNumber.rowCount !== 0){
            return res.sendStatus(409);
        }
        
        await connection.query(`
            INSERT INTO cards ("card_number", "security_number", "expiration_date", name, "payment_id") 
            VALUES ($1, $2, $3, $4, $5)
        `, [card_number, security_number, expiration_date, name, verifyRegister.rows[0].id]);
        

        res.sendStatus(201);

    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}
async function getCards (req, res) {
    try {
        const authorization = req.headers['authorization'];
        const token = authorization?.replace('Bearer ', '');

        if(!token) return res.sendStatus(401);


        const result = await connection.query(`
            SELECT * FROM sessions
            WHERE sessions.token = $1
        `, [token]);

        const session = result.rows[0];

        const payment = await connection.query(`
            SELECT * FROM payment_data WHERE "user_id" = $1
        `,[session.user_id]);

        if(payment.rowCount === 0){
            return res.sendStatus(404);
        }

        const cards = await connection.query(`
            SELECT name FROM cards WHERE "payment_id" = $1
        `, [payment.rows[0].id]);

        res.send(cards.rows).status(200);
    }
    catch (error) {
        res.sendStatus(500);
    }
}

export {
    postPayment,
    getCards,
}
