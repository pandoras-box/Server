const knex = require('./connection');

module.exports = {
  getActiveTasks: function(id){
    return knex.select('event.description','batch_event.approved')
    .from('batch_event')
    .join('event','batch_event.event_id','event.id')
    .where('parent_child_id',id)
    .andWhere('active',true);
  }
};
