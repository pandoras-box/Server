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
                                //pass the JWT
                                // return user
                            } else {
                                console.log(1);
                                return dbQueries.addNewUser(req.body.parentOrChild, parsedUserInfo)
                            }
                        })
                        .then((user) => {
                            console.log(2);
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
