const request = require('supertest');
const app = require('../app');

describe('ROUTING GET', () => {

    test('GET "/" expect 200', () => {
        return request(app).get('/').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Avast task');
        })
    })

    test('GET "/unixTime" expect 200', () => {
        return request(app).get('/unixTime').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Task: Get current time');
        })
    })

    test('GET "/nBytes" expect 200', () => {
        return request(app).get('/nBytes').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Task: Get first N bytes of a file');
        })
    })

    test('GET "/contentOfURL" expect 200', () => {
        return request(app).get('/contentOfURL').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('Task: Get content of URL');
        })
    })

    test('GET "/contentOfURL/thisShouldBeThere" expect 200', () => {
        return request(app).get('/contentOfURL/thisShouldBeThere').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toContain('thisShouldBeThere');
        })
    })

    test('GET "/badOne" expect 404', () => {
        return request(app).get('/BadOne').then(response => {
            expect(response.statusCode).toBe(404);
        })
    })
})