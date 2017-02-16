const knex = require('./connection');

module.exports = {
    getActiveTasks: function(id) {
        return knex.select('event.category', 'batch_event.status')
            .from('batch_event')
            .join('event', 'batch_event.event_id', 'event.id')
            .where('parent_child_id', id)
            .andWhere('active', true);
    },
    checkNewUser: function(parentOrChild, email) {
        // need to handle child at some point
        return knex(parentOrChild)
            .where('email', email)
            .first();
    },
    addParent: function(user) {
        return knex('parent')
            .insert({
                first_name: user.name.substring(0, user.name.indexOf(' ')),
                last_name: user.name.substring(user.name.indexOf(' ') + 1, user.name.length),
                email: user.email,
                is_paired: false
            }, '*')
            .then((user) => {
                return user[0];
            })

    },
    createParentChildEntry: function(parentID, childID) {
        return knex('parent_child')
            .insert({
                parent_id: parentID,
                child_id: childID
            }, '*')
            .then((entry) => {
                return entry[0];
            })
    },
    getParentChildID: function(user) {
        const type = user.type;
        return knex('parent_child')
            .select('parent_child.id')
            .join('child', 'parent_child.child_id', 'child.id')
            .join('parent', 'parent_child.parent_id', 'parent.id')
            .where(`parent_child.${type}_id`, user.id)
            .first();
    },
    updateChild: function(user) {
        return knex('child')
            .where('child.email', user.email)
            .update({
                first_name: user.name.substring(0, user.name.indexOf(' ')),
                last_name: user.name.substring(user.name.indexOf(' ') + 1, user.name.length),
                is_paired: true
            }, '*')
            .then((user) => {
                return user[0];
            })
    },
    getChildInfo: function(parent) {
        return knex('child')
            .join('parent_child', 'child.id', 'parent_child.child_id')
            .where('parent_child.parent_id', parent.id)
            .first()
    },
    addChild: function(parent) {
        return knex('child')
            .insert({
                email: parent.childEmail,
                is_paired: true
            }, '*')
            .then((child) => {
                return child[0];
            })
    },
    updateParentAsPaired: function(parent) {
        return knex('parent')
            .where('id', parent.id)
            .update({
                is_paired: true
            }, '*')
            .then((user) => {
                return user[0];
            })
    },
    createBatch: function(parent) {
        return knex('batch')
            .insert({
                created_date: new Date(),
                parent_child_id: parent.parentChildID
            }, '*')
            .then((batch) => {
                return batch[0];
            })
    },
    getUser: function(user) {
        return knex(user.type)
            .select('*')
            .where('id', user.id)
            .first()
    },
    getEvents: function(){
        return knex('event');
    },
    postBatch: function(user,batch) {
      console.log('hello',user,batch);
      return knex('parent_child')
        .where('parent_id',user.id)
        .then((parentChildID)=>{
          console.log('hello2',parentChildID);
          return knex('batch')
            .insert({
              created_date:knex.fn.now(),
              parent_child_id:parentChildID[0].parent_id
            },'*')
        })
        .then((newBatch)=>{
          console.log('hello3');
          let promises = [];
          for (var i = 0; i < batch.length; i++) {
            var currentBatch = batch[i]
            var promise = knex('batch_event')
              .insert({
                status: 'unstarted',
                active: true,
                event_id: currentBatch.eventID,
                batch_id: newBatch[0].id, //fill in
                parent_child_id: newBatch[0].parent_child_id, //user something
                description: currentBatch.description
              });
            promises.push(promise);
          }
          return Promise.all(promises)
        })
        .then((batchEvents)=>{
          console.log(batchEvents);
        })
    }
};
