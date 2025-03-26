//use env variables to conceal your credentials 
require('dotenv').config();

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './data_resources/db/test.sqlite3'
    },
    migrations: {
      directory: './data_resources/migrations/test'
    },
    seeds: {
      directory: './data_resources/seeds/test'
    },
    useNullAsDefault: true
  },

  dev: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: './data_resources/migrations/dev'
    },
    seeds: {
      directory: './data_resources/seeds/dev'
    }
  },

  prod: {
    client: 'pg',
    connection: {
      host: 'your_prod_host',
      user: 'your_postgres_user',
      password: 'your_postgres_password',
      database: 'prod_db'
    },
    migrations: {
      directory: './data_resources/migrations/prod'
    },
    seeds: {
      directory: './data_resources/seeds/prod'
    }
  }
};
