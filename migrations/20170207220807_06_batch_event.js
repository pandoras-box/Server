exports.up = function(knex, Promise) {
  return knex.schema.createTable("batch_event",function(table){
    table.increments();
    table.text('status').notNullable();
    table.boolean('active').notNullable();
    table.integer('event_id').references("event.id").unsigned().onDelete('CASCADE');
    table.integer('batch_id').references("batch.id").unsigned().onDelete('CASCADE');
    table.integer('parent_child_id').references("parent_child.id").unsigned().onDelete('CASCADE');
    table.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("batch_event");
};
