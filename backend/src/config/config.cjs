const dotenv = require('dotenv');
dotenv.config();

const common = {};

const isSqlite = (process.env.DB_DIALECT || 'postgres') === 'sqlite';

module.exports = {
  development: isSqlite
    ? {
        dialect: 'sqlite',
        storage: process.env.SQLITE_STORAGE || 'database.sqlite',
        logging: false,
        ...common,
      }
    : {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        database: process.env.DB_NAME || 'sponsorship_db',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
        ...common,
      },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgres',
    storage: process.env.SQLITE_STORAGE,
    logging: false,
    ...common,
  }
};
