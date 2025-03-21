const Hapi = require('@hapi/hapi');
const knexSingleton = require('./knex_singleton');
knexSingleton.setEvn('dev');
const { endpoints } = require('./routes'); 


const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000
  });
  
  const knexInstance = knexSingleton.getInstance();
  
  await knexInstance.migrate.down();
  await knexInstance.migrate.up();
  await knexInstance.seed.run({ env: 'dev' });
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
