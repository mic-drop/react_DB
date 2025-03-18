const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const DatabaseFixture = require('../databasefixture');
const { describe, it } = exports.lab = DatabaseFixture.script();

const UserService = require('../../service/user_service');

describe('User Service Integration Test', () => {

    it('should find a user by id', async () => {
        const user = await UserService.findById(1);
        
        expect(user).to.exist();
        expect(user.id).to.equal(1);
    });

    it('should return all users', async () => {
        const users = await UserService.findAll();
        
        expect(users).to.be.an.array();
        expect(users.length).to.equal(2);
    });

    it('should add a new user', async () => {
        const newUserData = { name: 'NewUser' };

        const newUserId = await UserService.add(newUserData);

        const user = await UserService.findById(newUserId);
        expect(newUserId).to.exist();
        expect(user).to.exist();
        expect(user.name).to.equal('NewUser');
    });

    it('should delete a user', async () => {
        const deleteId = 1;

        const rowsDeleted = await UserService.delete(deleteId);
        
        expect(rowsDeleted).to.equal(1);
        const user = await UserService.findById(deleteId);
        expect(user).to.be.undefined();
    });
})
