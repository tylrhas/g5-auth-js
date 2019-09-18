const { INTEGER, STRING } = require('sequelize')

module.exports = (sequelize) => sequelize.define('userGroup', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    name: {
      type: STRING
    }
  })
