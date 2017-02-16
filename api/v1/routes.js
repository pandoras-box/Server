var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');

router.post('/validate', (req, res, next) => {
    const user = req.user;
    res.json(user);

});

router.post('/account-page-info', function(req, res, next) {
    const user = req.user;
    if (user.is_paired) {
        dbQueries.getChildInfo(user)
            .then((child) => {
                user.childEmail = child.email;
                res.json(user);
            })
    } else {
        res.json(user);
    }
});

router.post('/pair-parent-child', function(req, res, next) {
    const parent = req.user;
    const childEmail = req.body.childEmail;
    parent.childEmail = childEmail;
    let globalParent = parent;
    dbQueries.addChild(parent)
        .then((child) => {
            globalParent.childID = child.id;
            return dbQueries.updateParentAsPaired(parent);
        })
        .then((updatedParent) => {
            globalParent.is_paired = updatedParent.is_paired;
            return dbQueries.createParentChildEntry(globalParent.id, globalParent.childID);
        })
        .then((parentChildEntry) => {
            globalParent.parentChildID = parentChildEntry.id;
            return dbQueries.createBatch(globalParent);
        })
        .then((batch) => {
            globalParent.batchID = batch.id;
            res.json(globalParent);
        })

});

router.post('/active-batch/:id', function(req, res, next) {
    const user = req.user;
    dbQueries.getActiveTasks(user.id)
        .then((tasks) => {
            user.tasks = tasks;
            res.json(user);
        });

});


router.post('/get-user', function(req, res, next) {
    const user = req.user;
    dbQueries.getUser(user)
        .then((user) => {
            res.json(user);
        });

});





module.exports = router;
