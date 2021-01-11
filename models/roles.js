const { INTEGER, STRING} = require('sequelize')
module.exports = sequelize => sequelize.define('role', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    name: {
      type: STRING
    },
    type: {
      type: STRING
    },
    urn: {
      type: STRING
    }
  })
