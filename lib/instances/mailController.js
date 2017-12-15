const MailController = require('../controllers/MailController');

module.exports = new MailController({
  mailService: require('./mailService'),
  userService: require('./userService')
});
