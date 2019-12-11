// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host:     'aox.ddns.net',
      port:     '3001',
      database: 'msdb',
      user:     'admin',
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/models/migrations'
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}