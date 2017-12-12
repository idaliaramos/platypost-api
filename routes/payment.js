//OPTION 1

const AddressService = require('../lib/services/AddressService');
const MailService = require('../lib/services/MailService');
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
    stripe.charges.create(
      req.body.paymentInfo,
      (stripeError, stripeSuccess) => {
        if (stripeError) {
          res.status(500).send({ stripeError });
          return;
        }
        Lob.letters.create(
          {
            description: 'Deployed',
            to: req.body.mailInfo.receiverInfo,
            from: req.body.mailInfo.senderInfo,
            file:
              'https://s3-us-west-2.amazonaws.com/lob-assets/letter-goblue.pdf',
            color: true
          },
          (lobError, lobSuccess) => {
            if (lobError) {
              res.status(500).send({ stripeSuccess, lobError });
              return;
            }
            //send address to address table
            //TO:DO get user id from request from loggein in user
            //use decoded jwt

            const service = new AddressService();
            const newAddress = service
              .createForUser(1, req.body.mailInfo.receiverInfo)
              .then(address => address);
            // whatever createForUser gives you,
            // you have access to it in here:
            // console.log(newAddress)
            //   // subsequent logic should be placed here.
            // });
            console.log(newAddress, 'this is the object');
            // const newAddress = service
            //   .createForUser(1, req.body.mailInfo.receiverInfo)
            //   .then(newAddress => Promise.resolve(newAddress));
            // console.log(newAddress, 'newAddress');

            // console.log(lobSuccess.to.address_line1);
            //get address id
            //send id and data to mail table

            const mailService = new MailService();
            const mailData = mailService
              .createForUser(1, {
                mailData: lobSuccess,
                addressId: 1,
                lobId: lobSuccess.id
              })
              .then(mail => {
                console.log(mail, 'mail');
              });
            console.log(mailData);
            res.status(200).send({
              stripeSuccess,
              lobSuccess
            });
          }
          //TODO: function that uploads stripe success and lobSuccess
        );
      }
    );
  });
  // .then(response => console.log(response));

  return app;
};

module.exports = paymentApi;
