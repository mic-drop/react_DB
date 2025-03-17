
const Knex = require('knex');
const knexConfig = require('../knexfile').test;
const knex = Knex(knexConfig);
const User = require('../model/user');

class UserRepository {

    constructor() {
      this.model = User;
      User.knex(knex);
    }
  
    async findAll() {
      return this.model.query();
    }
  
    async findById(id) {
      return this.model.query().findById(id);
    }
  
    async create(userData) {
      return this.model.query().insert(userData);
    }
  
    async update(id, userData) {
      return this.model.query().patchAndFetchById(id, userData);
    }
  
    async delete(id) {
      return this.model.query().deleteById(id);
    }
  }
  
  module.exports = UserRepository;
