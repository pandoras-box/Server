exports.up = function(knex, Promise) {
  return knex.schema.createTable("parent_child",function(table){
    table.increments();
    table.integer('parent_id').references("parent.id").unsigned().onDelete('CASCADE');
    table.integer('child_id').references("child.id").unsigned().onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("parent_child");
};
