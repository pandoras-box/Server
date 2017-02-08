exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "batch_event"; ALTER SEQUENCE batch_event_id_seq RESTART WITH 3')
  .then(()=>{
    return Promise.all([
      knex("batch_event").insert([{
        id:1,
        'event_id':1,
        'batch_id':1,
        'parent_child_id':1,
        'approved':false,
        'active':true
      },{
        id:2,
        'event_id':2,
        'batch_id':1,
        'parent_child_id':1,
        'approved':false,
        'active':true
      },{
        id:3,
        'event_id':3,
        'batch_id':1,
        'parent_child_id':1,
        'approved':false,
        'active':true
      }])
    ]);
  });
};
