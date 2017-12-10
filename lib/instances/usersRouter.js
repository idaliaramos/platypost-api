const express = require('express');
const Boom = require('boom');
const router = express.Router();

const userController = require('./userController');
router.post('/users', userController.create);
router.all('/users', (request, response, next) =>
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET', 'POST']))
);
router.get('/users/:id(\\d+)', userController.getById);

module.exports = router;
