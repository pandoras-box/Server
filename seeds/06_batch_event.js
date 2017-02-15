exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "batch_event"; ALTER SEQUENCE batch_event_id_seq RESTART WITH 7')
  .then(()=>{
    return Promise.all([
      knex("batch_event").insert([{
        id:1,
        'event_id':1,
        'batch_id':1,
        'parent_child_id':1,
        'active':true,
        'status': 'unstarted',
        'description': "Don't forget to make your bed too!"
      },{
        id:2,
        'event_id':2,
        'batch_id':1,
        'parent_child_id':1,
        'active':true,
        'status': 'pending',
        'description': "That means both cans and the recycling!"
      },{
        id:3,
        'event_id':3,
        'batch_id':1,
        'parent_child_id':1,
        'active':true,
        'status': 'complete',
        'description': "ALL of them!"
      },{
        id:4,
        'event_id':1,
        'batch_id':2,
        'parent_child_id':2,
        'active':true,
        'status': 'unstarted',
        'description': "Don't forget to make your bed too!"
      },{
        id:5,
        'event_id':2,
        'batch_id':2,
        'parent_child_id':2,
        'active':true,
        'status': 'pending',
        'description': "That means both cans and the recycling!"
      },{
        id:6,
        'event_id':3,
        'batch_id':2,
        'parent_child_id':2,
        'active':true,
        'status': 'complete',
        'description': "ALL of them!"
      }])
    ]);
  });
};
