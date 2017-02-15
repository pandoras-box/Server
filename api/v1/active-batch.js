var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');

router.post('/:id', function(req, res, next) {
  console.log("Make it to active-batch route");
  const user = req.user;
  dbQueries.getActiveTasks(user.id)
  .then((tasks)=>{
    user.tasks = tasks;
    const returnObject = {
      user:user,
      checkedAuthorization: true,
      authorized: true
    }
    res.json(returnObject);
  });

});

module.exports = router;
