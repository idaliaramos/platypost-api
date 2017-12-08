var Lob = require('lob')('test_066ca30f3d0fe263d7b6a8af760a4983778');
// var lobFactory = require('./index.js');
// var options = { apiKey: 'foo', host: 'bar' };
// var Lob = require('lob')(options);

// Lob.letters.create(
//   {
//     description: 'thursday letter',
//     to: {
//       name: 'testubg appspot ',
//       address_line1: '185 Berry St',
//       address_line2: '# 6100',
//       address_city: 'San Francisco',
//       address_state: 'CA',
//       address_zip: '94107',
//       address_country: 'US'
//     },
//     from: {
//       name: 'Leore Avidar',
//       address_line1: '185 Berry St',
//       address_line2: '# 6100',
//       address_city: 'San Francisco',
//       address_state: 'CA',
//       address_zip: '94107',
//       address_country: 'US'
//     },
//     file:
//       'https://mailapp-backend-187406.appspot.com/s3/uploads/dd64c052-97f1-441c-93ce-57ba547ead81_/uploads/IdaliaRamosFullStackEngineer.pdf',
//     color: true
//   },
//   function(err, res) {
//     console.log(err, res);
//   }
// );
//
//
Lob.postcards.create(
  {
    description: 'Demo Postcard job',
    to: {
      name: 'Harry Zhang',
      address_line1: '185 Berry St',
      address_line2: '# 6100',
      address_city: 'San Francisco',
      address_state: 'CA',
      address_zip: '94107'
    },
    from: {
      name: 'Harry Zhang',
      address_line1: '185 Berry St',
      address_line2: '# 6100',
      address_city: 'San Francisco',
      address_state: 'CA',
      address_zip: '94107'
    },
    front:
      'https://mailapp-backend-187406.appspot.com/s3/uploads/dd64c052-97f1-441c-93ce-57ba547ead81_/uploads/IdaliaRamosFullStackEngineer.pdf',
    back: 'https://lob.com/postcardback.pdf'
  },
  function(err, res) {
    console.log(err, res);
  }
);
