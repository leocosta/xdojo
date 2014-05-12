require('./_addLibsHelper');

process.env.NODE_ENV = 'test';
process.env.DEBUG = true;
process.env.NODE_PORT = 8000;

var settings = require('../../app/config/settings');
var dbSettings = settings.database[process.env.NODE_ENV];

global.Sequelize = require('sequelize');

global.orm = new Sequelize(
  dbSettings.database,
  dbSettings.username,
  dbSettings.password,
  dbSettings.options
);

global.request = supertest;