/*jslint unparam: true*/

'use strict';

var path     = require('path');
var express  = require('express');
var settings = require('./settings');
var models   = require('../app/models');

module.exports = function (app) {
  app.configure(function () {

    app.use(express.static(path.join(settings.path, 'public')));
    app.use(express.logger({ format: 'dev' }));
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    models.initialize(app);
    require('../routes/athletes')(app);

    //app.use(routes);
  });
};