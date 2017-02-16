var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');

router.post('/', function(req, res, next) {
    const user = req.user;
    if (user.is_paired) {
        dbQueries.getChildInfo(user)
            .then((child) => {
              user.childEmail = child.email;
              res.json(user);
            })
    } else{
      res.json(user);
    }



});

module.exports = router;
