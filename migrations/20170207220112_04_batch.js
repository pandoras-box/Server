exports.up = function(knex, Promise) {
  return knex.schema.createTable("batch",function(table){
    table.increments();
    table.dateTime('created_date').notNullable();
    table.dateTime('due_date').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("batch");
};
