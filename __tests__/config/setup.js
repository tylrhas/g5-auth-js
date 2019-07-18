require('dotenv').config()
const models = require('../../models')
async function setup() {
  await models.sequelize.sync()
  global.sequelize = models.sequelize
}
module.exports = setup