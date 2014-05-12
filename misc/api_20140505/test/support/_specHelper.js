process.env.NODE_ENV = 'test';
process.env.DEBUG = true;

var sequelizeConf = require("../../config/config.json")[process.env.NODE_ENV];

global.Sequelize = require("sequelize");
global.orm = new Sequelize(
  sequelizeConf.database,
  sequelizeConf.username,
  sequelizeConf.password,
  sequelizeConf.options
);

global.DEBUG = true;

require('./_addLibsHelper');