exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "parent"; ALTER SEQUENCE parent_id_seq RESTART WITH 2')
  .then(()=>{
    return Promise.all([
      knex("parent").insert([{
        id:1,
        'first_name':'Kevin',
        'last_name':'Erickson',
        'email':'Kevin@gmail.com',
      }])
    ]);
  });
};
