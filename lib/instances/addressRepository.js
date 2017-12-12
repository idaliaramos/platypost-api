const EntityRepository = require('../repositories/EntityRepository');

const { DEBUG } = require('../../env');

module.exports = new EntityRepository({
  entityName: 'Address',
  db: require('./defaultDatabase'),
  logError: DEBUG ? console.error : undefined // eslint-disable-line no-console
});
