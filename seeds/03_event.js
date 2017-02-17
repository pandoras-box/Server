exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "event"; ALTER SEQUENCE event_id_seq RESTART WITH 9')
  .then(()=>{
    return Promise.all([
      knex("event").insert([{
        id:1,
        'category':'Clean Room'
      },{
        id:2,
        'category':'Take Out Trash'
      },{
        id:3,
        'category':'Clean Dishes'
      },{
        id:4,
        'category':'Clean Bathroom'
      },{
        id:5,
        'category':'Do Laundry'
      },{
        id:6,
        'category':'Mow The Lawn'
      },{
        id:7,
        'category':'Do Homework'
      },{
        id:8,
        'category':'Walk The Dog'
      }])
    ]);
  });
};
