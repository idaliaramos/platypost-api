const express = require('express');
//added cors here tooo
// app.use(cors());
const SERVER_CONFIGS = require('./constants/server');

const configureServer = require('./server');
const configureRoutes = require('./routes');
// const payment = require('../routes/payment');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

configureServer(app);
configureRoutes(app);
// also tried this
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.use(
  '/s3',
  require('react-s3-uploader/s3router')({
    bucket: 'mails110017',
    region: 'us-west-1', //optional
    signatureVersion: 'v4', //optional (use for some amazon regions: frankfurt and others)
    // headers: { 'Access-Control-Allow-Origin': 'http://localhost:8080' }, // added that addy vs *, moded this to server too,
    ACL: 'private', // this is default
    uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  })
);

// app.use('/s3/sign')

app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS.PORT);
});
