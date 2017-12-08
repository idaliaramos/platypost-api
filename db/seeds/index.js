exports.seed = function(knex, Promise) {
  return Promise.resolve()
    .then(() => knex('receiverName').del())
    .then(() => knex('User').del())
    .then(() =>
      knex('User').insert(
        [
          {
            id: 1,
            name: 'idalia',
            email: 'idalia@gmail.com',
            hashedPassword:
              '$2a$10$nAVDMfgZLsDxKcRxbY8aoObH5dfJ01XsreR1jm5RuhxBlqfSK82ki'
          },
          {
            id: 2,
            name: 'Michael',
            email: 'MPJ@gmail.com',
            hashedPassword:
              '$2a$10$Z6BgoE6XmeThisIsTest230mEifbXTfY0uQE0tDDjIHdKy'
          }
        ],
        '*'
      )
    )
    .then(() =>
      knex.raw(`SELECT setval('"User_id_seq"', (SELECT MAX("id") FROM "User"))`)
    )
    .then(() =>
      knex('mailData').insert([
        {
        id: 1,
        senderAddress: {'200 Buchanan st 173 San Francisco CA 94102'}
        receiverAddress: {'200 Buchanan st 173 San Francisco CA 94102'},
        url:
          'https://guidetoiceland.imgix.net/4928/x/0/top-10-beautiful-waterfalls-of-iceland-1.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-1.1.0&w=883&s=181dbff8aab1eb0ae2931751e822d320',
        createdAt: '2017-11-17T20:05:18.814Z',
        updatedAt: '2017-11-17T20:05:18.814Z'
        }
      ])
    )
    .then(() =>
      knex.raw(
        `SELECT setval('"Mail_id_seq"', (SELECT MAX("id") FROM "Mail"))`
      )
    )
};
