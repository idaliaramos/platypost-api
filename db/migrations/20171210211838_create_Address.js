exports.up = function(knex, Promise) {
  return knex.schema.createTable('Address', table => {
    table.increments('id').primary();
    table.text('name');
    table.text('address_line1').notNullable().defaultTo('');
    table.text('address_line2');
    table.text('address_state').notNullable().defaultTo('');
    table.text('address_city').notNullable().defaultTo('');
    table.text('address_zip').notNullable().defaultTo('');
    table.text('address_country').notNullable().defaultTo('');
    table.text('company');
    table
      .integer('userId')
      .notNullable()
      .references('User.id')
      .onDelete('CASCADE')
      .index();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Address');
};
