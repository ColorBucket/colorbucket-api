'use strict';

const express = require('express'),
      logger = require('morgan'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      compress = require('compression'),
      methodOverride = require('method-override'),
      cors = require('cors'),
      httpStatus = require('http-status'),
      expressWinston = require('express-winston'),
      expressValidation = require('express-validation'),
      helmet = require('helmet'),
      winstonInstance = require('./winston'),
      routes = require('../api/routes/index.route'),
      config = require('../config'),
      interceptor = require('./interceptor'),
      APIError = require('../api/helpers/APIError');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// Setting Up Security on routes
app.use(interceptor);

// mount all routes on /api path
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {// eslint-disable-line no-unused-vars
  return res.status(500).json({
    success: false,
    code: -1,
    message: "Unexpected error happened. Please report on Github!",
    data: config.env === 'development' ? err.stack : {}
  })
});

module.exports = app;
