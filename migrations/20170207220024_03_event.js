exports.up = function(knex, Promise) {
  return knex.schema.createTable("event",function(table){
    table.increments();
    table.string('description').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("event");
};
