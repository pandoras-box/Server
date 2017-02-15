exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "batch"; ALTER SEQUENCE batch_id_seq RESTART WITH 3')
  .then(()=>{
    return Promise.all([
      knex("batch").insert([{
        id:1,
        'created_date':'2016-02-14 12:00:00',
        'due_date':'2016-02-07 11:00:00'
      },{
        id:2,
        'created_date':'2016-02-14 12:00:00',
        'due_date':'2016-02-07 11:00:00'
      }])
    ]);
  });
};
