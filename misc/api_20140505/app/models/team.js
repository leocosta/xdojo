'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Team",
    {
      title: {
        type: DataTypes.STRING,
        notNull: true,
        notEmpty: true
      }
    },
    {
      tableName: "teams"
    }
  );
};