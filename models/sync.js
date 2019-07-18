const fs = require('fs')
const path = require('path')

module.exports = function (models) {
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'sync.js' ) // get all the model files
    .forEach(file => {
      const model = models.sequelize.import(path.join(__dirname, file))
      const { name } = model
      models[name] = model
    })

  Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models)
    }
  })
  // return { models, models.sequelize }
}
