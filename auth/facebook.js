var express = require('express');
var rp = require('request-promise');
const FACEBOOK_URL = 'https://graph.facebook.com';
const LOCAL_URL = 'http://localhost/callback';
const dotenv = require('dotenv').config();
const jwtAuth =  require('./jwtAuth'); 



module.exports = {
  getFBShortAccess: function(access_token){
    console.log(access_token);
    var options = {
      method: 'GET',
      uri: `${FACEBOOK_URL}/v2.2/me?fields=email,name,gender,picture&access_token=${access_token}`,
    };
    return rp(options);
  }


}
