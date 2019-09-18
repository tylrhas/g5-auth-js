const passport = require('passport')
const cookieSession = require('cookie-session')
module.exports = {
  init,
  isAuthenticated,
  models
}
/**
 *
 *
 * @param {*} app
 * @param {*} config
 */
function init(app, config) {
  app.use(cookieSession({
    name: 'mysession',
    keys: [`${config.session.secret}`],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  const db = require('./models')
  require('./config/passport')(passport, db.user, config.passport, config.authMeEndpoint)
  require('./routes/auth')(app, passport, config.sucessRedirectPath)
  return models
}

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/g5_auth/users/auth/g5')
  }
}

function models(sequelize) {
  return require('./models/sync')(sequelize)
}
