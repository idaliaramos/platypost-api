const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
// const PORT = 8001;
// const app = require('express')();

('use strict');
const express = require('express');
const app = express();
// [START hello_world]
// Say hello!
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});
const stripe = require('stripe')(keySecret);
const morgan = require('morgan');
app.use(morgan('dev'));
app.set('view engine', 'jsx');
app.use(require('body-parser').urlencoded({ extended: false }));
//app or index js on line 20?
//check
app.get('/', (req, res) => res.render('app.js', { keyPublishable }));

app.post('/charge', (req, res) => {
  let amount = 500;
  console.log(keySecret, 'this is the key');
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'Sample Charge',
        currency: 'usd',
        customer: customer.id
      })
    )
    .then(charge => res.render('charge.js'));
  //^^^used to be charge in the back end, moved it to front end, how do i change this
});
// [END hello_world]
if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log('App listening on port', port);
  });
}
// [END server]
module.exports = app;
