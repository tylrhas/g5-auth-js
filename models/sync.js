const fs = require('fs')
const path = require('path')

module.exports = function (sequelize) {
  const models = {}
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'sync.js' )
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize)
      const { name } = model
      models[name] = model
    })

  Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models)
    }
  })
  return models 
}
