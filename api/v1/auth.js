var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');
const fbAuth = require ('../../auth/facebook')

router.post('/', function(req, res, next) {
  // add logic to check local storage for a Long term token
  //get the token and make sure it is facebook valid
  //if valid, give the user a JWT with their userID
  //if it is not valid, make them sign in again
  //if it does not exist, add them to the db and give a token

  fbAuth.getFBShortAccess(req.body.token)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
    res.json("boo");
  });
});

module.exports = router;
