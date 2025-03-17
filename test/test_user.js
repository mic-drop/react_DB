const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { describe, it, before } = exports.lab = Lab.script();
const Knex = require('knex');
const knexConfig = require('../knexfile').test;
const knex = Knex(knexConfig);
const { Model } = require('objection');

// Bind Objection to your Knex instance
Model.knex(knex);

// Import your User model
const User = require('../model/user');

describe('User Model Tests', () => {

  // Run seeds before tests so that your DB is populated
  before(async () => {
    await knex.seed.run({ env: 'test' });
  });

  it('getUser(1) should not be null', async () => {
    const user = await User.query().findById(1);
    expect(user).to.exist();
  });

  it('should have exactly 2 users', async () => {
    const users = await User.query();
    expect(users.length).to.equal(2);
  });
});
