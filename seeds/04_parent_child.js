exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "parent_child"; ALTER SEQUENCE parent_child_id_seq RESTART WITH 1')
  // .then(()=>{
  //   return Promise.all([
  //     knex("parent_child").insert([{
  //       id:1,
  //       'parent_id':1,
  //       'child_id':1
  //     },{
  //       id:2,
  //       'parent_id':1,
  //       'child_id':2
  //     }])
  //   ]);
  // });
};
