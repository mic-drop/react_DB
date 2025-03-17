const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { describe, it, before } = exports.lab = Lab.script();

const Knex = require('knex');
const knexConfig = require('../knexfile').test;
const knex = Knex(knexConfig);

const UserRepository = require('../repository/user_repository');

describe('User Repository Tests', () => {
    const user_repository = new UserRepository();

    before(async () => {
        await knex.migrate.down();
        await knex.migrate.up();
        await knex.seed.run({ env: 'test' });
    });

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

});
