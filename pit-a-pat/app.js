const PORT = 3000;

var express = require('express');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();

// view engine setup
app.set('views', '../views');
app.set('view engine', 'jade');

app.use(express.static('public'));

app.use('/', index);

app.use('/users', users);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
