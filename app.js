'use strict'

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sneatRouter = require('./routes/sneat');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  const openPath = req.path.split("/")[1];
  const pageModel = {
    pageOption: {
      title: "JinOh-Express",
      menu: true,
      navbar: true,
    },
    menuOption: {
      activeUrl: req.originalUrl,
      openPath: openPath,
    },
  };

  res.pageModel = pageModel;

  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sneat', sneatRouter);

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
