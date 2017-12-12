exports.up = function(knex, Promise) {
  return knex.schema.createTable('Mail', table => {
    table.increments('id').primary();
    table
      .integer('userId')
      .notNullable()
      .references('User.id')
      .onDelete('CASCADE')
      .index();
    table.jsonb('mailData').notNullable();
    table.text('lobId').defaultTo('');
    table
      .integer('addressId')
      .notNullable()
      .references('Address.id')
      .onDelete('CASCADE')
      .index();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Mail');
};
