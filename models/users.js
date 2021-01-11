const { INTEGER, STRING} = require('sequelize')
module.exports = sequelize => {
  const user = sequelize.define('user', {
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
  user.associate = (models) => {
    models.user.belongsTo(models.userGroup)
    models.user.hasMany(models.role)
  }
  return user
}
