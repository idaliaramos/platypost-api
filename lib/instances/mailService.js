const MailService = require('../services/MailService');

const { DEBUG } = require('../../env');

module.exports = new MailService({
  // mailValidator: require('./mailValidator'),
  mailRepository: require('./mailRepository'),
  userRepository: require('./userRepository'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});
