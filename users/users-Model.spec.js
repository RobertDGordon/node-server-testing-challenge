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

            const users = await db('Users');
            
            expect(users).toHaveLength(3);
        })
    
    })

    describe.skip('delete', function() {
        it('removes', async function() {
            // check table empty
            // add
            // delete
            // check table again
        })
    })
})