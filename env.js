if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
  });
}
console.log(process.env.NODE_ENV, 'this is the process <<<<<<<<<<<<<<<<');
console.log(  SECRET_KEY, 'this is the secret <<<<<<<<<<<<<<<<');
module.exports = {
  DEBUG: parseInt(process.env.DEBUG || 0),
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PUBLISHABLE_KEY:process.env.PUBLISHABLE_KEY
  SECRET_KEY: process.env.SECRET_KEY
  JWT_KEY: process.env.JWT_KEY
};
