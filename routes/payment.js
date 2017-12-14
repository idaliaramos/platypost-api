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

  app.get('/s3/*');

  app.post('/', (req, res) => {
    console.log(req.body.mailInfo.S3UploadPublicPath, 'this is the url');
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
            file: `https://mailapp-backend-187406.appspot.com${req.body.mailInfo
              .S3UploadPublicPath}`,
            color: true
          },
          (lobError, lobSuccess) => {
            if (lobError) {
              console.log(lobError, 'this is the lob error');
              res.status(500).send({ stripeSuccess, lobError });
              return;
            }
            //send address to address table
            //TO:DO get user id from request from loggein in user
            //use decoded jwt
            console.log(req.body, 'body');

            const service = new AddressService();
            const newAddress = service
              .createForUser(1, req.body.mailInfo.receiverInfo)
              .then(address => address);
            console.log(newAddress, 'this is the object');
            //get address id
            //send id and data to mail table
            const mailService = new MailService();
            //create Address for user
            //refactor so that i can lob first charge 2sd ...
            // stripe.chargeUser(token).then(() => {
            //   return;
            //   //return all the stuff in the bottom
            // });
            service
              .createForUser(1, req.body.mailInfo.receiverInfo)
              .then(address => {
                return mailService
                  .createForUser(1, {
                    mailData: lobSuccess,
                    addressId: address.id,
                    lobId: lobSuccess.id
                  })
                  .then(mail => {
                    console.log(mail, 'mail');
                  })
                  .then(() => {
                    res.status(200).send({
                      stripeSuccess,
                      lobSuccess
                    });
                  });
              })
              .catch(err => {
                console.log('err', err);
                res.status(500);
              });
          }
        );
      }
    );
  });
  // .then(response => console.log(response));

  return app;
};

module.exports = paymentApi;
