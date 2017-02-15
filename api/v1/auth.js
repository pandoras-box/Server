var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');
const fbAuth = require('../../auth/facebook');
const jwtAuth = require('../../auth/jwtAuth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


router.post('/', function(req, res, next) {
    fbAuth.getFBShortAccess(req.body.token)
        .then(function(result) {
            var parsedUserInfo = JSON.parse(result);
            const type = req.body.parentOrChild
            dbQueries.checkNewUser(type, parsedUserInfo.email)
                .then((user) => { // if user is found
                    if (user) {
                        if (type === 'parent') {
                            // check if they have all information
                            return user
                        } else if(type === 'child') {
                          if (user.first_name) {
                            return user;
                          } else {
                            return dbQueries.updateChild(parsedUserInfo);
                          }
                        }
                    } else {
                        if (type === 'parent') {
                            return dbQueries.addNewUser(type, parsedUserInfo)
                        } else if (type === 'child') {
                            childUser = {
                              noParent:true,
                              email:parsedUserInfo.email
                            }
                            return childUser;
                        }
                    }
                })
                .then((user) => {
                    if (user.noParent) {
                      // boot
                      return null;
                    } else {
                      user.type = type;
                      return jwtAuth.createJWT(user)
                    }
                });
        })
    .catch(function(err) {
        console.log(err);
        res.json("boo");
    });
});

module.exports = router;
