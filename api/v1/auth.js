var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.json(true);
});

module.exports = router;
