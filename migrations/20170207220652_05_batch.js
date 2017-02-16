exports.up = function(knex, Promise) {
  return knex.schema.createTable("batch",function(table){
    table.increments();
    table.dateTime('created_date').notNullable();
    table.integer('parent_child_id').references("parent_child.id").unsigned().notNullable().onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("batch");
};
