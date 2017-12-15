const HistoryService = require('../services/HistoryService');

const { DEBUG } = require('../../env');

module.exports = new HistoryService({
  // historyValidator: require('./historyValidator'),
  historyRepository: require('./historyRepository'),
  userRepository: require('./userRepository'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});
