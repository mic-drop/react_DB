const Hapi = require('@hapi/hapi');
const { endpoints } = require('./routes'); // assuming your endpoints are exported here

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000
  });

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
