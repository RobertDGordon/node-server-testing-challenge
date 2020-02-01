const Users = require('./users-model.js');

const db = require('../database/dbConfig.js');

describe('users model', function() {

    describe('test environment', function(){
        it('should run in testing', function(){
            expect(process.env.DB_ENV).toBe('testing')
        })
    })

    describe('add()', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('adds user to database', async function(){
            await Users.add({username:'Test1', password:'Not null'});
            await Users.add({username:'Test2', password:'Not null'});
            await Users.add({username:'Test3', password:'Not null'});

            const users = await db('users');
            
            expect(users).toHaveLength(3);
        })
    
    })

    describe('remove()', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('removes user by id', async function() {
            // check table empty
            const usersEmpty = await db('users')
            expect(usersEmpty).toHaveLength(0);

            await Users.add({username:'Test1', password:'Not null'});
            await Users.add({username:'Test2', password:'Not null'});
            const usersAdded = await db('users')
            expect(usersAdded).toHaveLength(2);

            await Users.remove(1)
            const users = await db('users');
            expect(users).toHaveLength(1);
        })
    })

    describe('findById()', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('finds user by id', async function(){
            await Users.add({username:'Test1', password:'Not null'});
            await Users.add({username:'Test2', password:'Not null'});
            await Users.add({username:'Test3', password:'Not null'});

            const users = await db('users');
            
            expect(users).toHaveLength(3);

            const user = await Users.findById(3)
            expect(user).toEqual({ id: 3, password: "Not null", type: null, username: "Test3"});
        })
    
    })
    describe('findBy(filter)', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })
        it('finds user by id', async function(){
            await Users.add({username:'Test1', password:'Not null', type: 'admin'});
            await Users.add({username:'Test2', password:'Not null', type: 'admin'});
            await Users.add({username:'Test3', password:'Not null', type: 'user'});

            const users = await db('users');
            
            expect(users).toHaveLength(3);

            const result = await Users.findBy("admin");
            expect(result).toHaveLength(2);
            expect(result).toEqual([{"id": 1, "password": "Not null", "type": "admin", "username": "Test1"}, {"id": 2, "password": "Not null", "type": "admin", "username": "Test2"}]);
        })
    
    })
})