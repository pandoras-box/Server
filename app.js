const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const unlock = require('./api/v1/unlock');
const routes = require('./api/v1/routes');
const auth = require('./api/v1/auth');
const emit = require('./api/v1/emit');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const jwtAuth = require('./auth/jwtAuth');
const dbQueries = require('./db/queries');


const dotenv = require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(cors());

require('./sockets').initialize(io);

function ensureLoggedIn(req, res, next) {
    const token = req.body.userToken;
    if (token) {
        const decryptedUser = jwtAuth.decodeJWT(token);
        dbQueries.getUser(decryptedUser)
            .then((user) => {
                user.type = decryptedUser.type;
                user.checkedAuthorization = true;
                user.authorized = true;
                req.user = user;
                console.log("User is authorized");
                // console.log(req.user);
                next();
            })

    } else {
        console.log("Unauthorized");
        let user = {};
        user.checkedAuthorization = true;
        user.authorized = false;
        res.json(user);
    }
}


app.use('/secure', ensureLoggedIn, routes);
app.use('/unlock', unlock);
app.use('/auth', auth);
app.use('/emit', emit);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {
    app,
    server
};
