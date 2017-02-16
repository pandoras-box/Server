exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "child"; ALTER SEQUENCE child_id_seq RESTART WITH 1')
  // .then(()=>{
  //   return Promise.all([
  //     knex("child").insert([{
  //       id:1,
  //       'first_name':'Dillon',
  //       'last_name':'Corkran',
  //       'email':'dill@gmail.com',
  //       'is_paired': true
  //     },{
  //       id:2,
  //       'email':'dillonss.corkran@colorado.edu'
  //     }])
  //   ]);
  // });
};
