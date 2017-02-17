var express = require('express');
var router = express.Router();
const dbQueries = require('../../db/queries');

router.post('/validate', (req, res, next) => {
    const user = req.user;
    res.json(user);
});

router.post('/get-child-info', function(req, res, next) {
    const user = req.user;
    if (user.type === 'parent') {
      user.oppositeType = 'child';
    } else {
      user.oppositeType = 'parent';
    }
    if (user.is_paired) {
        dbQueries.getChildInfo(user)
            .then((link) => {
                user.linkEmail = link.email;
                user.childID = link.id;
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

router.post('/active-batch', function(req, res, next) {
    const user = req.user;
    dbQueries.getActiveTasks(user.id)
        .then((tasks) => {
            // console.log(tasks);
            user.tasks = tasks;
            res.json(user);
        });
});


router.post('/get-user', function(req, res, next) {
    const user = req.user;
    dbQueries.getUser(user)
        .then((dbUser) => {
            dbUser.type = user.type;
            dbUser.authorized = user.authorized;
            dbUser.checkedAuthorization = user.checkedAuthorization;
            res.json(dbUser);
        });
});


router.post('/event', function(req, res, next) {
    const user = req.user;
    dbQueries.getEvents()
        .then((events) => {
            user.events = events;
            res.json(user);
        })
});

router.post('/batch', function(req, res, next) {
    const user = req.user;
    dbQueries.postBatch(user, req.body.tempTasks)
        .then((result) => {
            res.json(result);
        })

});

router.post('/get-parent-child-id', (req, res, next) => {
    const user = req.user;
    dbQueries.getParentChildID(user)
        .then((id) => {
            res.json({
                id
            })
        })
});

router.post('/update-task-status', (req, res, next) => {
    const user = req.user;
    const task = req.body.currentTask;
    dbQueries.updateTaskStatus(task)
        .then((updatedTask) => {
            res.json(updatedTask);
        })
});

router.post('/send-for-logs', (req, res, next) => {
    const user = req.user;
    const logItem = req.body.delivery;
    console.log(logItem);
});

router.post('/close-batch', (req, res, next) => {
    const user = req.user;
    const tasks = req.body.tasks;
    let closedTasks = tasks.map((task) => {
        return dbQueries.closeTask(task);
    })
    return Promise.all(closedTasks);
})





module.exports = router;
