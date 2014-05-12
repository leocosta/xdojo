/*jslint unparam: true*/

'use strict';

var express  = require('express');
var settings = require('./settings');
var models   = require('../models');

module.exports = function (app) {
  app.configure(function () {

    app.use(express.logger({ format: 'dev' }));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);

    /// error handlers
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    models.initialize(app);
    require('../routes/athletes')(app);
  });
};