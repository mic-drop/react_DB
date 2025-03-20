const Hapi = require('@hapi/hapi');
const { endpoints } = require('./routes'); 


const Knex = require('knex');
const knexConfig = require('./knexfile').test;
const knexInstance = Knex(knexConfig);

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000
  });

  await knexInstance.migrate.down();
  await knexInstance.migrate.up();
  await knexInstance.seed.run({ env: 'test' });
  server.app.knex = knexInstance;


  // Register all endpoints from the array
  server.route(endpoints);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
