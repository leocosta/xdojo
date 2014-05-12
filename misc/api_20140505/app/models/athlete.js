'use strict';

module.exports = function (sequelize, DataTypes) {

  return sequelize.define('Athlete', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  },
    {
      tableName: "athletes"
    });
};
