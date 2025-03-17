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
      client: 'mysql',
      connection: {
        host: 'localhost',
        user: 'your_mysql_user',
        password: 'your_mysql_password',
        database: 'dev_db'
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
  