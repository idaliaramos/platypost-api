const express = require('express');
const Boom = require('boom');
const router = express.Router();

const historyController = require('./historyController');

router.get('/users/:id/history', historyController.findByUserId);
router.all('/users/:id/history', (request, response, next) =>
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET']))
);
module.exports = router;
