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
    name: 'g5Auth',
    keys: [`${config.session.secret}`],
    // maxAge: 24 * 60 * 60 * 1000 // 24 hours
    maxAge: 15000
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  const db = require('./models')
  require('./config/passport')(passport, db.user, config.passport, config.authMeEndpoint)
  require('./routes/auth')(app, passport, config)
  return models
}

function isAuthenticated (req, res, next, config) {
  
  if (req.isAuthenticated()) {
    next()
  } else {
    let options = {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
  }
    const { path } = req
    res.cookie('redirectPath', path, options)
    debugger
    res.redirect('/g5_auth/users/auth/g5')
  }
}

function models(sequelize) {
  return require('./models/sync')(sequelize)
}
