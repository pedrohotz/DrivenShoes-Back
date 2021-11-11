import connection from '../database/database.js';

async function postCheckout (req, res) {

    try {
        const authorization = req.headers['authorization'];
        const token = authorization?.replace('Bearer ', '');

        if(!token) return res.sendStatus(401);


        const result = await connection.query(`
            SELECT * FROM sessions
            WHERE sessions.token = $1
        `, [token]);

        const session = result.rows[0];

        await connection.query(`
            INSERT INTO checkout ("user_id", "total_price", "final_data") VALUES (${session.user_id}, 0, '9/11/2021')
        `);

        const checkout = await connection.query(`
            SELECT * FROM checkout ORDER BY id DESC LIMIT 1
        `);

        const products = req.body; 

        let total_price = 0;

        for(let i = 0 ; i < products.products.length; i++){
            const product = products.products[i];
            await connection.query(`
                INSERT INTO checkout_products ("checkout_id", "product_id", quantity) VALUES ($1, $2, $3)
            `, [checkout.rows[0].id, product.product_id, product.quantity]);

            const result = await connection.query(`
                SELECT * FROM product WHERE id = $1
            `, [product.product_id]);

            const parcial_value = result.rows[0].price;
            
            total_price = total_price + (Number(parcial_value) * product.quantity);
        }
        
        await connection.query(`
            UPDATE checkout SET total_price = $2 WHERE id = $1
        `, [checkout.rows[0].id, total_price]);
        

        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}

async function getCheckout (req, res) {
    try {
        const authorization = req.headers['authorization'];
        const token = authorization?.replace('Bearer ', '');

        if(!token) return res.sendStatus(401);


        const result = await connection.query(`
            SELECT * FROM sessions
            WHERE sessions.token = $1
        `, [token]);

        const session = result.rows[0];

        const history = await connection.query(`
            SELECT * FROM checkout WHERE "user_id" = $1 ORDER by id ASC
        `,[session.user_id]);

        res.send(history.rows).status(200);
    }
    catch (error) {
        res.sendStatus(500);
    }
}

export {
    postCheckout,
    getCheckout,
}










