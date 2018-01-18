///////////////////////////Letters/////////////////////////////////////////////
//
// const AddressService = require('../lib/services/AddressService');
// const MailService = require('../lib/services/MailService');
// const stripe = require('../constants/stripe');
// const userRepository = require('../lib/instances/userRepository');
// const mailRepository = require('../lib/instances/mailRepository');
// var Lob = require('lob')('test_066ca30f3d0fe263d7b6a8af760a4983778');
// const paymentApi = app => {
//   app.get('/', (req, res) => {
//     res.send({
//       message: 'Hello Stripe checkout server!',
//       timestamp: new Date().toISOString()
//     });
//   });
//
//   app.get('/s3/*');
//
//   app.post('/', (req, res) => {
//     console.log(req.body, 'req body');
//     stripe.charges.create(
//       req.body.paymentInfo,
//       (stripeError, stripeSuccess) => {
//         if (stripeError) {
//           res.status(500).send({ stripeError });
//           return;
//         }
//         Lob.letters.create(
//           {
//             description: 'Deployed',
//             to: req.body.mailInfo.receiverInfo,
//             from: req.body.mailInfo.senderInfo,
//             file: `https://mailapp-backend-187406.appspot.com${req.body.mailInfo
//               .S3UploadPublicPath}`,
//             color: true
//           },
//           (lobError, lobSuccess) => {
//             if (lobError) {
//               console.log(lobError, 'this is the lob error');
//               res.status(500).send({ stripeSuccess, lobError });
//               return;
//             }
//             //send address to address table
//
//             const service = new AddressService();
//             const newAddress = service
//               .createForUser(
//                 req.body.mailInfo.userId,
//                 req.body.mailInfo.receiverInfo
//               )
//               .then(address => address);
//             console.log('do i get here 1 :)');
//             //get address id
//             //send id and data to mail table
//             //TODO:; i think this is the problem
//             const mailService = new MailService({
//               mailRepository,
//               userRepository
//             });
//             console.log(req.body.mailInfo, req.body.mailInfo.receiverInfo);
//             // stripe.chargeUser(token).then(() => {
//             //   return;
//             //   //return all the stuff in the bottom
//             // });
//             service
//               .createForUser(
//                 req.body.mailInfo.userId,
//                 req.body.mailInfo.receiverInfo
//               )
//               .then(address => {
//                 console.log(address, 'i am 2');
//                 return mailService
//                   .createForUser(req.body.mailInfo.userId, {
//                     mailData: lobSuccess,
//                     addressId: address.id,
//                     lobId: lobSuccess.id
//                   })
//                   .then(mail => {
//                     console.log(mail, 'mail');
//                   })
//                   .then(() => {
//                     res.status(200).send({
//                       stripeSuccess,
//                       lobSuccess
//                     });
//                   });
//               })
//               .catch(err => {
//                 console.log('err', err);
//                 res.status(500);
//               });
//           }
//         );
//       }
//     );
//   });
//   return app;
// };
//
// module.exports = paymentApi;
/////////////////////////LETTERS END//////////////////////////////////////////////////////////
