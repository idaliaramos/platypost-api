const stripe = require('../constants/stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

const paymentApi = app => {
  app.get('/', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString()
    });
  });

  app.post('/', (req, res) => {
    console.log(req.body, 'this is the body in the post');
    stripe.charges.create(req.body, postStripeCharge(res));
  });

  // stripe.tokens.create({
  //   card: {
  //     "number": '4242424242424242',
  //     "exp_month": 12,
  //     "exp_year": 2018,
  //     "cvc": '123'
  //   }
  // }, function(err, token) {
  //   // asynchronously called
  // });

  return app;
};

module.exports = paymentApi;
