const passport = require('passport')
const session = require('express-session') 
module.exports = {
  init,
  secured,
  models
}
/**
 *
 *
 * @param {*} app
 * @param {*} config
 */
function init(app, config) {
  app.use(session(config.session))
  app.use(passport.initialize())
  app.use(passport.session())
  require('./config/passport')(passport, config.passport)
  require('./routes/auth')(app, passport, config)
}

function secured (req, res, next) {
  if (req.user) {
    req.userRoles = req.user.roles.map((role) => {
      const { name, type, urn } = role
      return { name, type, urn }
    })
    return next()
  }
  req.session.returnTo = req.originalUrl
  res.redirect('/login')
}

function models(sequelize) {
  return require('./models/sync')(sequelize)
}

