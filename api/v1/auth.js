var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');
const fbAuth = require('../../auth/facebook');
const jwtAuth = require('../../auth/jwtAuth');


router.post('/', function(req, res, next) {
    let currentUser = null;
    fbAuth.getFBShortAccess(req.body.token)
        .then(function(result) {
            var parsedUserInfo = JSON.parse(result);
            dbQueries.checkNewUser(req.body.parentOrChild, parsedUserInfo.email)
                .then((user) => { // if user is found
                    if (user) {
                        if (req.body.parentOrChild === 'child') {
                            // check if they have all information
                        } else {
                            return user
                        }
                    } else {
                        if (req.body.parentOrChild === 'parent') {
                            return dbQueries.addNewUser(req.body.parentOrChild, parsedUserInfo)
                        } else if (req.body.parentOrChild === 'child') {
                            // if child... need to check here if they have a parent in the DB
                            //if yes, return child user
                            //if no, we need to kick them out somehow
                        }
                    }
                })
                .then((user) => {
                    currentUser = user;
                    if (req.body.parentOrChild === 'parent') {
                        return dbQueries.addParentChild(user.id)
                    } else if (req.body.parentOrChild === 'child') {
                        //return parentChildID that corresponds to that child
                    }
                })
                .then((parentChildTableID) => {
                    currentUser.parentChildTableID = parentChildTableID;
                    // create JWT with full user
                    console.log(currentUser); // use this to set up the JWT


                });
        })

    .catch(function(err) {
        console.log(err);
        res.json("boo");
    });
});

module.exports = router;
