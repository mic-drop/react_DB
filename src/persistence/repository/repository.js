
const knexSingleton = require('../knex_singleton');
const knex = knexSingleton.getInstance();

class Repository {

  constructor(Model) {
    this.model = Model;
    this.model.knex(knex);
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

module.exports = Repository;
