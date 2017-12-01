//OPTION 1
const stripe = require('../constants/stripe');
var Lob = require('lob')('test_066ca30f3d0fe263d7b6a8af760a4983778');
const paymentApi = app => {
  app.get('/', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString()
    });
  });

  app.post('/', (req, res) => {
    stripe.charges.create(req.body, (stripeError, stripeSuccess) => {
      if (stripeError) {
        res.status(500).send({ stripeError });
        return;
      }
      Lob.letters.create(
        {
          description: 'Demo Letter',
          to: {
            name: 'Nestor',
            address_line1: '185 Berry St',
            address_line2: '# 6100',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94107',
            address_country: 'US'
          },
          from: {
            name: 'Leore Avidar',
            address_line1: '185 Berry St',
            address_line2: '# 6100',
            address_city: 'San Francisco',
            address_state: 'CA',
            address_zip: '94107',
            address_country: 'US'
          },
          file:
            'https://s3-us-west-2.amazonaws.com/lob-assets/letter-goblue.pdf',
          color: true
        },
        (lobError, lobSuccess) => {
          if (lobError) {
            res.status(500).send({ stripeSuccess, lobError });
            return;
          }
          res.status(200).send({
            stripeSuccess,
            lobSuccess
          });
        }
      );
    });
  });
  // .then(response => console.log(response));

  return app;
};

module.exports = paymentApi;
//OPTION 2
// const stripe = require('../constants/stripe');
// var Lob = require('lob')('test_066ca30f3d0fe263d7b6a8af760a4983778');
// const postStripeCharge = res => (stripeErr, stripeRes) => {
//   if (stripeErr) {
//     res.status(500).send({ error: stripeErr });
//   } else {
//     Lob.letters.create(
//       {
//         description: 'Demo Letter',
//         to: {
//           name: 'Harry Zhang',
//           address_line1: '185 Berry St',
//           address_line2: '# 6100',
//           address_city: 'San Francisco',
//           address_state: 'CA',
//           address_zip: '94107',
//           address_country: 'US'
//         },
//         from: {
//           name: 'Leore Avidar',
//           address_line1: '185 Berry St',
//           address_line2: '# 6100',
//           address_city: 'San Francisco',
//           address_state: 'CA',
//           address_zip: '94107',
//           address_country: 'US'
//         },
//         file: 'https://s3-us-west-2.amazonaws.com/lob-assets/letter-goblue.pdf',
//         color: true
//       },
//       function(err, res) {
//         console.log(err, res);
//       }
//     );
//     res.status(200).send({ success: stripeRes });
//   }
// };
//
// const paymentApi = app => {
//   app.get('/', (req, res) => {
//     res.send({
//       message: 'Hello Stripe checkout server!',
//       timestamp: new Date().toISOString()
//     });
//   });
//
//   app.post('/', (req, res) => {
//     stripe.charges.create(req.body, postStripeCharge(res));
//   });
//
//   return app;
// };
//
// module.exports = paymentApi;
//OPTION3
