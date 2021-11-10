import connection from "../database/database.js";


async function auth(req,res,next){
    const authorization = req.headers['authorization'];
    const sessionToken = authorization?.split('Bearer ')[1];

    try {
        const session = await connection.query('SELECT * FROM sessions WHERE TOKEN = $1',[sessionToken]);

        if (session.rowCount === 0){
            return res.sendStatus(401);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
    next();
}

export {
    auth,
}