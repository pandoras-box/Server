var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');

router.get('/:id', function(req, res, next) {
  dbQueries.getActiveTasks(1)  // need to change the hard coded id
  .then((tasks)=>{
    res.json(tasks);
  });

});

module.exports = router;
