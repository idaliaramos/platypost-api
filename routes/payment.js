//////////////////////////////////POSTCARDS//////////////////////////////////////////////////////////////////////////

const AddressService = require('../lib/services/AddressService');
const MailService = require('../lib/services/MailService');
const stripe = require('../constants/stripe');
const userRepository = require('../lib/instances/userRepository');
const mailRepository = require('../lib/instances/mailRepository');
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
    stripe.charges.create(
      req.body.paymentInfo,
      (stripeError, stripeSuccess) => {
        if (stripeError) {
          res.status(500).send({ stripeError });
          return;
        }
        //req.body.mailInfo.receiverInfo should not have the message
        Lob.postcards.create(
          {
            description: 'Hello',
            to: req.body.mailInfo.receiverInfo,
            from: req.body.mailInfo.senderInfo,
            front: `http://platypost110017-env.us-west-1.elasticbeanstalk.com${req
              .body.mailInfo.S3UploadPublicPath}`,
            back: 'tmpl_ebddb82469e58ce',
            merge_variables: {
              message: req.body.mailInfo.messageInfo.message
            }
          },
          (lobError, lobSuccess) => {
            if (lobError) {
              console.log(lobError, 'this is the lob error');
              res.status(500).send({ stripeSuccess, lobError });
              return;
            }
            const service = new AddressService();
            const newAddress = service
              .createForUser(
                req.body.mailInfo.userId,
                req.body.mailInfo.receiverInfo
              )
              .then(address => address);
            const mailService = new MailService({
              mailRepository,
              userRepository
            });
            // stripe.chargeUser(token).then(() => {
            //   return;
            //   //return all the stuff in the bottom
            // });
            service
              .createForUser(
                req.body.mailInfo.userId,
                req.body.mailInfo.receiverInfo
              )
              .then(address => {
                return mailService
                  .createForUser(req.body.mailInfo.userId, {
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
  return app;
};

module.exports = paymentApi;
