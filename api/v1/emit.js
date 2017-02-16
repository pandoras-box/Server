var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');

router.post('/validate', (req, res, next) => {
    const user = req.user;
    res.json(user);

});







module.exports = router;
