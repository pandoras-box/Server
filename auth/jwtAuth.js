const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


module.exports = {
  createJWT: function(user){
    const jwtPayload = {
      name: user.name,
      email: user.email
    }
    return jwt.sign(jwtPayload, process.env.JWT_SECRET);
  }


}
