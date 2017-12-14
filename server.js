// const cors = require('cors');
// const bodyParser = require('body-parser');
//
// const CORS_WHITELIST = require('./constants/frontend');
//
// const corsOptions = {
//   origin: (origin, callback) =>
//     CORS_WHITELIST.indexOf(origin) !== -1
//       ? callback(null, true)
//       : callback(new Error('Not allowed by CORS'))
// };
//
// const configureServer = app => {
//   console.log('****');
//   app.use(
//     cors({
//       origin: 'http://localhost:3000',
//       credentials: true
//     })
//   );
//   app.use(bodyParser.json());
// };
//
// module.exports = configureServer;
