const AddressService = require('../services/AddressService');

const { DEBUG } = require('../../env');

module.exports = new AddressService({
  // addressValidator: require('./addressValidator'),
  addressRepository: require('./addressRepository'),
  userRepository: require('./userRepository'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});
