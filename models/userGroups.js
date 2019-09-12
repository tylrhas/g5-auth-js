const { INTEGER, STRING } = require('sequelize')

module.exports = (sequelize) => {
  const userGroup = sequelize.define('userGroup', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    name: {
      type: STRING
    }
  })
  userGroup.associate = (models) => {
    models.userGroup.belongsTo(models.user)
  }
  return userGroup
}
