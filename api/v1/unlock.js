var express = require('express');
var router = express.Router();
var rp = require('request-promise');
const PI_URL = 'http://10.6.64.164:3000';

router.get('/', function(req, res, next) {

  var options = {
    uri: `${PI_URL}/unlock`,
    json: true // Automatically parses the JSON string in the response
  };


  rp(options)
      .then(function (data) {
        console.log(data);
        res.json(data);
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
          // API call failed...
      });
});

module.exports = router;
