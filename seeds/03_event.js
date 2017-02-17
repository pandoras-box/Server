exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "event"; ALTER SEQUENCE event_id_seq RESTART WITH 8')
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
        'category':'Do Homework'
      },{
        id:5,
        'category':'Practice Instrument'
      },{
        id:6,
        'category':'Play Outside'
      },{
        id:7,
        'category':'Call Grandma'
      }])
    ]);
  });
};
