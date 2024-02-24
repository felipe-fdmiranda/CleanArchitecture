import {app, sequilize} from "../express";
import request from 'supertest';
import e from "express";

describe('End to End Testing for Customer', () => {

    beforeEach(async () => {
        await sequilize.sync({force: true});
    });

    afterAll(async () => {
        await sequilize.close();
    });

    it('should create a new customer', async () => {
        const response = await request(app).post('/customer').send({
            name: 'John',
            address: {
                street: 'Street',
                city: 'City',
                zip: '12345',
                number: 123
            }
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('John');
        expect(response.body.address.street).toBe('Street');
        expect(response.body.address.city).toBe('City');
        expect(response.body.address.zip).toBe('12345');
        expect(response.body.address.number).toBe(123);
    });

    it('should not create a customer', async () => {
        const response = await request(app).post('/customer').send({
            name: 'John'
        });

        expect(response.status).toBe(500);
    });

    it('should list all customers', async () => {
        const response1 = await request(app).post('/customer').send({
            name: 'John',
            address: {
                street: 'Street 1',
                city: 'City 1',
                zip: '12345 1',
                number: 123
            }
        });
        expect(response1.status).toBe(200);

        const response2 = await request(app).post('/customer').send({
            name: 'Jane',
            address: {
                street: 'Street 2',
                city: 'City 2',
                zip: '12345 2',
                number: 1234
            }
        });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get('/customer').send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        expect(listResponse.body.customers[0].name).toBe('John');
        expect(listResponse.body.customers[0].address.street).toBe('Street 1');

        expect(listResponse.body.customers[1].name).toBe('Jane');
        expect(listResponse.body.customers[1].address.street).toBe('Street 2');

        const listResponseXML = await request(app).get('/customer').set('Accept', 'application/xml').send();
        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
        expect(listResponseXML.text).toContain('<customers>')
        expect(listResponseXML.text).toContain('<customer>')
        expect(listResponseXML.text).toContain('<id>')
        expect(listResponseXML.text).toContain('<name>John</name>')
        expect(listResponseXML.text).toContain('<address>')
        expect(listResponseXML.text).toContain('<street>Street 1</street>')
        expect(listResponseXML.text).toContain('<city>City 1</city>')
        expect(listResponseXML.text).toContain('<number>123</number>')
    });

});
