require('dotenv').config();

module.exports = {
  test: {
    client: 'sqlite3',
    connection: {
      filename: './db/test.sqlite3'
    },
    migrations: {
      directory: './migrations/test'
    },
    seeds: {
      directory: './seeds/test'
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
      directory: './migrations/dev'
    },
    seeds: {
      directory: './seeds/dev'
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
      directory: './migrations/prod'
    },
    seeds: {
      directory: './seeds/prod'
    }
  }
};
