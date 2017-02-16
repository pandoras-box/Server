var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');

router.post('/:id', function(req, res, next) {
    const user = req.user;
    dbQueries.getActiveTasks(user.id)
        .then((tasks) => {
            user.tasks = tasks;
            res.json(user);
        });

});

module.exports = router;
