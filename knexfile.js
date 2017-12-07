// // Update with your config settings.
//
// module.exports = {
//
//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './dev.sqlite3'
//     }
//   },
//
//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },
//
//   production: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user:     'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   }
//
// };
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = require('./env');

module.exports = {
  [process.env.NODE_ENV]: {
    client: 'pg',
    connection: {
      host: PGHOST,
      database: PGDATABASE,
      user: PGUSER,
      password: PGPASSWORD
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: `./db/seeds`
    }
  }
};
