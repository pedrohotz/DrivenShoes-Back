import supertest from 'supertest';
import app from '../app.js';
import connection from '../database/database.js';

describe("POST /checkout", () => {
    
    beforeEach(async () => {
        await connection.query(`DELETE FROM checkout`);
        await connection.query(`DELETE FROM sessions`);
        await connection.query(`INSERT INTO sessions ("user_id", token) VALUES (1, '12345')`)
      });

    it("returns 201 for valid params", async() => {
        const body = {
                    products: [
                        {product_id: 1, quantity: 1}, 
                        {product_id: 2, quantity: 3}, 
                        {product_id: 3, quantity: 2}, 
                        {product_id: 4, quantity: 1}
                    ]
        };


        const result = await supertest(app)
                    .post("/checkout")
                    .send(body)
                    .set("Authorization", '12345');
        const status = result.status;
        expect(status).toEqual(201);
    });

    it("returns 401 for invalid token", async() => {
        const body = {
                    products: [
                        {product_id: 1, quantity: 1}, 
                        {product_id: 2, quantity: 3}, 
                        {product_id: 3, quantity: 2}, 
                        {product_id: 4, quantity: 1}
                    ]
        }; // valid body

        const invalidToken = '';

        const result = await supertest(app).post("/checkout").send(body).set('Authorization', invalidToken);
        const status = result.status;
        
        expect(status).toEqual(401);
    });


});

describe("GET /checkout", () => {
    
    beforeEach(async () => {
        await connection.query(`DELETE FROM checkout`);
        await connection.query(`DELETE FROM sessions`);
        await connection.query(`INSERT INTO sessions ("user_id", token) VALUES (1, '12345')`)
      });

    it("returns 200 for valid token", async() => {

        const result = await supertest(app).get("/checkout").set("Authorization", '12345');
        const status = result.status;
        
        expect(status).toEqual(200);
    });

    it("returns 401 for invalid token", async() => {

        const result = await supertest(app).get("/checkout").set("Authorization", '');
        const status = result.status;
        
        expect(status).toEqual(401);
    });


});

