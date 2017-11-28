var Lob = require('lob')('test_066ca30f3d0fe263d7b6a8af760a4983778');
// var lobFactory = require('./index.js');
// var options = { apiKey: 'foo', host: 'bar' };
// var Lob = require('lob')(options);

Lob.letters.create(
  {
    description: 'Demo Letter',
    to: {
      name: 'Harry Zhang',
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
    file: 'https://s3-us-west-2.amazonaws.com/lob-assets/letter-goblue.pdf',
    color: true
  },
  function(err, res) {
    console.log(err, res);
  }
);
