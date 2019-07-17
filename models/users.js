const { INTEGER, STRING} = require('sequelize')
module.exports = sequelize => sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    firstName: {
      type: STRING
    },
    lastName: {
      type: STRING
    },
    role: {
      type: STRING
    },
    token: {
      type: STRING
    },
    email: {
      type: STRING
    }
  })

