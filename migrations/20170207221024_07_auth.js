exports.up = function(knex, Promise) {
  return knex.schema.createTable("auth",function(table){
    table.increments();
    table.string('google_id');
    table.string('photo');
    table.string('token');
    table.integer('parent_id').references("parent.id").unsigned().onDelete('CASCADE');
    table.integer('child_id').references("child.id").unsigned().onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("auth");
};
