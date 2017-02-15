const knex = require('./connection');

module.exports = {
  getActiveTasks: function(id){
    return knex.select('event.description','batch_event.approved')
    .from('batch_event')
    .join('event','batch_event.event_id','event.id')
    .where('parent_child_id',id)
    .andWhere('active',true);
  },
  checkNewUser: function(parentOrChild, email){
    // need to handle child at some point
    return knex(parentOrChild)
    .where('email',email)
    .first();
  },
  addNewUser: function(parentOrChild, user){
    return knex(parentOrChild)
    .returning('*')
    .insert({
      first_name: user.name.substring(0,user.name.indexOf(' ')),
      last_name: user.name.substring(user.name.indexOf(' ') + 1,user.name.length),
      email: user.email
    });

  },
  addParentChild: function(id){
    knex('parent_child')
    .insert({
      parent_id:id
    });
  },
  checkParent: function(user){
    knex('parent_child')
    .select('parent_child.id')
    .join('child','parent_child.child_id','child.id')
    .where('parent_child.child_id', user.id)
  }
};
