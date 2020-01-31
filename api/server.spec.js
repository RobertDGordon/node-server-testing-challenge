const request = require('supertest');

const server = require('./server.js');

describe('server', function() {
    it('runs the tests', function() {
        expect(true).toBe(true);
    })

    describe('GET /', function() {
        it('should return 200 ok', function() {
            return request(server).get('/').then(res=>{
                expect(res.status).toBe(200);
            })
        })

        it('should return HTML', function() {
            return request(server).get('/').then(res=>{
                expect(res.type).toMatch(/html/i);
            })
        })

        it('should return "Its alive!"', function() {
            return request(server).get('/').then(res=>{
                expect(res.text).toEqual("It's alive!");
            })
        })
    })

    describe('GET /api/auth', function() {
        it('should return 200 ok', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.status).toBe(200);
            })
        })

        it('should return HTML', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.type).toMatch(/html/i);
            })
        })

        it('should return "Its alive!"', function() {
            return request(server).get('/api/auth').then(res=>{
                expect(res.text).toEqual("This is the auth route");
            })
        })
    })
    describe('POST /api/auth', function() {
        it('should return 201 ok', function() {
            return request(server)
                .post('/api/auth/register')
                .send({ username: 'TestRegister', password: 'testing', type: 'admin'})
                .then(res=>{
                    expect(res.status).toBe(201);
                })
        })
    })    
})