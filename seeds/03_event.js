exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "event"; ALTER SEQUENCE event_id_seq RESTART WITH 4')
  .then(()=>{
    return Promise.all([
      knex("event").insert([{
        id:1,
        'description':'Clean Room'
      },{
        id:2,
        'description':'Take Out Trash'
      },{
        id:3,
        'description':'Clean Dishes'
      }])
    ]);
  });
};
