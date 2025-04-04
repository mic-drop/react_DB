const { expect } = require('@hapi/code');
const DatabaseFixture = require('../databasefixture');
const { describe, it } = exports.lab = DatabaseFixture.script();


describe('User Repository Tests', () => {
    const Repository = require('../../src/persistence/repository/repository');
    const User = require('../../src/model/user');
    const user_repository = new Repository(User);


    it('getUser(1) should not be null', async () => {
        const user = await user_repository.findById(1);
        expect(user).to.exist();
    });

    it('should have exactly 2 users', async () => {
        const users = await user_repository.findAll();
        expect(users.length).to.equal(2);
    });

    it('it should be able to add new user', async () => {
        const newUser = await user_repository.create({ name: "NewUser" });
        const userList = await user_repository.findAll();

        expect(newUser.id).to.equal(3);
        expect(userList.length).to.equal(3);
        expect(newUser).to.equal(await user_repository.findById(3));
    })

    it('it should be able to delete user', async () => {
        const deleteId = 2;

        const deletedRows = await user_repository.delete(deleteId);
        const userList = await user_repository.findAll();
        const deletedUser = await user_repository.findById(deleteId);

        expect(deletedRows).to.equal(1);
        expect(deletedUser).to.equal(undefined);
        expect(userList.length).to.equal(1);
    })
});
