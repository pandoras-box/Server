exports.up = function(knex, Promise) {
  return knex.schema.createTable("child",function(table){
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('email').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("child");
};
