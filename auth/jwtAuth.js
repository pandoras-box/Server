const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


module.exports = {
  createJWT: function(user){
    const jwtPayload = {
      type: user.type,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    }
    return jwt.sign(jwtPayload, process.env.JWT_SECRET);
  }


}
