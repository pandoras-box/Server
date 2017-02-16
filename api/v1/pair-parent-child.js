var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');

router.post('/', function(req, res, next) {
    const user = req.user;
    const childEmail = req.body.childEmail;

    // create child with only an email
    //change is_paired on both to true
    // create parent_child entry
    // create batch entry

    if (user.is_paired) {
        dbQueries.addChild(user)
            .then((child) => {
              user.childEmail = child.email;
              returnObject.user = user;
              res.json(returnObject);
            })
    } else{
      returnObject.user = user;
      res.json(returnObject);
    }



});

module.exports = router;
