const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const scheduleRouter = require('./routes/schedule');

const DB = require('./bin/database');


const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.set('trust proxy', 1);
app.use(session({
    secret: 'justakey1',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: 60000}
}));

DB.init(DB.getConnectionOptions());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("x-powered-by", false);
//app.set("db", DB);
//app.use(DB);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use(['/users', '/u'], usersRouter);
app.use('/schedule', scheduleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
