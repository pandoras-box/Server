const knex = require('./connection');

module.exports = {
  getActiveTasks: function(id){
    return knex.select('event.description','batch_event.approved')
    .from('batch_event')
    .join('event','batch_event.event_id','event.id')
    .where('parent_child_id',id)
    .andWhere('active',true);
  },
  checkNewUser: function(email){
    // need to handle child at some point
    return knex('parent')
    .where('email',email)
    .first();
  },
  addNewUser: function(user){
    return knex('parent')
    .returning('id')
    .insert({
      first_name: user.name.substring(0,user.name.indexOf(' ')),
      last_name: user.name.substring(user.name.indexOf(' ') + 1,user.name.length),
      email: user.email
    });
  }
};
