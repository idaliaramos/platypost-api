const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const usersRouter = require('./lib/instances/usersRouter');
const authenticationRouter = require('./lib/instances/authenticationRouter');
const SERVER_CONFIGS = require('./constants/server');
const configureRoutes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');

const CORS_WHITELIST = require('./constants/frontend');

const corsOptions = {
  origin: (origin, callback) =>
    CORS_WHITELIST.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

// const ENV = require('env');
// const payment = require('../routes/payment');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);
app.use(bodyParser.json());
configureRoutes(app);

// process.env.AWS_ACCESS_KEY_ID = 'AKIAIJZULTHVD5MZV6VQ';
// process.env.AWS_SECRET_ACCESS_KEY = '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';
app.use(authenticationRouter);
app.use(usersRouter);
app.use(
  '/s3',
  require('react-s3-uploader/s3router')({
    bucket: 'mails110017',
    region: 'us-west-1', //optional
    signatureVersion: 'v4', //optional (use for some amazon regions: frankfurt and others)
    // headers: { 'Access-Control-Allow-Origin': '*' }, // optional
    ACL: 'private', // this is default
    uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  })
);

app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS.PORT);
});
