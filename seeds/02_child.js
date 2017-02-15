exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "child"; ALTER SEQUENCE child_id_seq RESTART WITH 3')
  .then(()=>{
    return Promise.all([
      knex("child").insert([{
        id:1,
        'first_name':'Dillon',
        'last_name':'Corkran',
        'email':'dill@gmail.com',
      },{
        id:2,
        'email':'dillon.corkran@colorado.edu'
      }])
    ]);
  });
};
