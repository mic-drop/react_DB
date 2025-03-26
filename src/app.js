const knexSingleton = require('./persistence/knex_singleton');
knexSingleton.setEvn("dev");
const knexInstance = knexSingleton.getInstance();

const start = async function () {

    await knexInstance.migrate.down();
    await knexInstance.migrate.up();
    await knexInstance.seed.run({ env: 'test' });
    const server = require('./server');
    server.start();
}

start();


