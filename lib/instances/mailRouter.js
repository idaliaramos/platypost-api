const express = require('express');
const Boom = require('boom');
const router = express.Router();

const mailController = require('./mailController');

router.get('/users/:id/mail', mailController.findByUserId);
router.all('/users/:id/mail', (request, response, next) =>
  next(Boom.methodNotAllowed(null, null, ['OPTIONS', 'GET']))
);
module.exports = router;
