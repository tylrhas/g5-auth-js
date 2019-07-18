const { INTEGER, STRING, BOOLEAN } = require('sequelize')
module.exports = (sequelize) => {
  const builder = sequelize.define('test', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER
    },
    name: {
      type: STRING
    }
  })
  return builder
}
