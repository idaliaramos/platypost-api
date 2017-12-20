const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { JWT_KEY } = require('./env');
const usersRouter = require('./lib/instances/usersRouter');
// const historyRouter = require('./lib/instances/historyRouter');
const mailRouter = require('./lib/instances/mailRouter');
const authenticationRouter = require('./lib/instances/authenticationRouter');
const SERVER_CONFIGS = require('./constants/server');
const configureRoutes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
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
    origin: 'http://platypost.s3-website-us-west-1.amazonaws.com',
    credentials: true
  })
);
app.use(bodyParser.json());
configureRoutes(app);
app.use(
  jwt({
    secret: JWT_KEY,
    requestProperty: 'jwt.payload',
    credentialsRequired: false,
    audience: 'platypost',
    issuer: 'platypost'
  })
);
app.use((request, response, next) => {
  const authenticatedUserId = request.jwt ? request.jwt.payload.sub : undefined;
  request.authenticatedUserId =
    Number.isFinite(authenticatedUserId) && authenticatedUserId > 0
      ? authenticatedUserId
      : null;
  next();
});
app.use(authenticationRouter);
app.use(mailRouter);
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
  console.log('Server running on port: >>>>>>>>>>>>' + SERVER_CONFIGS.PORT);
});
