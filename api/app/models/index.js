/*jslint stupid: true */

'use strict';

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var settings  = require("../config/settings");

module.exports = {
  initialize: function (app) {

    var models = this,
      dbSettings = settings.database[app.get("env")],
      sequelize = new Sequelize(
        dbSettings.database,
        dbSettings.username,
        dbSettings.password,
        dbSettings.options
      );

    fs
      .readdirSync(__dirname)
      .filter(function (file) {
        return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'));
      })
      .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        models[model.name] = model;
      });

    sequelize
      .sync()
      .complete(function (err) {
        if (err) {
          throw err[0];
        }
      });

    /*
    Object.keys(models).forEach(function (modelName) {
      if (models[modelName].options.hasOwnProperty('associate')) {
        models[modelName].options.associate(models);
      }
    });
    */

  }
};