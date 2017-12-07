const PLAIN_TEXT_KEY = require('./keyFile');
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
  });
}

module.exports = {
  DEBUG: parseInt(process.env.DEBUG || 0),
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PUBLISHABLE_KEY: process.env.PUBLISHABLE_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
  JWT_KEY: process.env.JWT_KEY,
  AWS_SECRET_ACCESS_KEY: PLAIN_TEXT_KEY,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID
};
