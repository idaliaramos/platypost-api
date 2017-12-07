exports.up = function(knex, Promise) {
  return knex.schema.createTable('Mail', table => {
    table.increments('id').primary();
    table
      .integer('userId')
      .notNullable()
      .references('User.id')
      .onDelete('CASCADE')
      .index();
    table.string('name').notNullable().defaultTo('');
    table.string('address_line_1').notNullable().defaultTo('');
    table.string('address_line_2').defaultTo('');
    table.string('address_city').notNullable().defaultTo('');
    table.string('address_state').notNullable().defaultTo('');
    table.string('address_zipcode').notNullable().defaultTo('');
    table.text('url').notNullable().defaultTo('');
    table.text('message').defaultTo('');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Mail');
};
