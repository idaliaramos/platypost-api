const HistoryController = require('../controllers/HistoryController');

module.exports = new HistoryController({
  historyService: require('./historyService'),
  userService: require('./userService')
});
