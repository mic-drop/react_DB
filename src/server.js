const Hapi = require('@hapi/hapi');


const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 3000
  });

  const { endpoints } = require('./routes');

  // Register all endpoints from the array
  server.route(endpoints);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

exports.start = async function () {
  init();
}
