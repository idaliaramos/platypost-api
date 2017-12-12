exports.seed = function(knex, Promise) {
  return Promise.resolve()
    .then(() => knex('Mail').del())
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
          }
        ],
        '*'
      )
    )
    .then(() =>
      knex.raw(`SELECT setval('"User_id_seq"', (SELECT MAX("id") FROM "User"))`)
    )
    .then(() =>
      knex('Mail').insert([
        {
          id: 1,
          userId: 1,
          mailData: { name: 'dalia', address: '200buchannan' },
          lobId: '898d0adfjaldkjfaaldkjfafa',
          addressId: 90,
          createdAt: '2017-11-17T20:05:18.814Z'
        }
      ])
    )
    .then(() =>
      knex.raw(`SELECT setval('"Mail_id_seq"', (SELECT MAX("id") FROM "Mail"))`)
    );
};
