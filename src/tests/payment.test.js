import supertest from 'supertest';
import app from '../app.js';
import connection from '../database/database.js';

describe("POST /payment", () => {
    
    beforeEach(async () => {
        await connection.query(`DELETE FROM payment_data`);
        await connection.query(`DELETE FROM cards`);
        await connection.query(`DELETE FROM sessions`);
        await connection.query(`INSERT INTO sessions ("user_id", token) VALUES (1, '12345')`)
      });

    it("returns 201 for valid params", async() => {
        const body = {
            
            card_number: "aaaaaaaaaaaaaaaa",
            security_number: "aaa",
            expiration_date: '10/11/2021',
            name: "caixaaa"   
            
        };


        const result = await supertest(app)
                    .post("/payment")
                    .send(body)
                    .set("Authorization", '12345');
        const status = result.status;
        expect(status).toEqual(201);
    });

    it("returns 401 for invalid token", async() => {
        const body = {
            
            card_number: "aaaaaaaaaaaaaaaa",
            security_number: "aaa",
            expiration_date: '10/11/2021',
            name: "caixaaa"   
            
        };

        const invalidToken = '';

        const result = await supertest(app).post("/payment").send(body).set('Authorization', invalidToken);
        const status = result.status;
        
        expect(status).toEqual(401);
    });


});

describe("GET /payment", () => {
    
    beforeEach(async () => {
        await connection.query(`DELETE FROM payment_data`);
        await connection.query(`DELETE FROM cards`);
        await connection.query(`DELETE FROM sessions`);
        await connection.query(`INSERT INTO sessions ("user_id", token) VALUES (1, '12345')`);
        await connection.query(`
            INSERT INTO payment_data ("user_id") VALUES (1)`);
      });

    it("returns 200 for valid token", async() => {

        const result = await supertest(app).get("/payment").set("Authorization", '12345');
        const status = result.status;
        
        expect(status).toEqual(200);
    });

    it("returns 401 for invalid token", async() => {

        const result = await supertest(app).get("/payment").set("Authorization", '');
        const status = result.status;
        
        expect(status).toEqual(401);
    });


});
