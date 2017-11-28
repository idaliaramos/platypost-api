const express = require('express');

const SERVER_CONFIGS = require('./constants/server');

const configureServer = require('./server');
const configureRoutes = require('./routes');

const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
configureServer(app);
configureRoutes(app);

app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log(
    'Server running on port: ' + SERVER_CONFIGS.PORT,
    SERVER_CONFIGS,
    '<<<serverconfigs'
  );
});
