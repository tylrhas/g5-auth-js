const passport = require('passport')
const cookieSession = require('cookie-session')
module.exports = {
  init,
  isAuthenticated
}
/**
 *
 *
 * @param {*} app
 * @param {*} models
 * @param {*} config
 */
function init(app, models, config) {
  app.use(cookieSession({
    name: 'mysession',
    keys: [`${config.session.secret}`],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  require('./models/sync')(models)
  require('./config/passport')(passport, models.user, config.passport)
  require('./routes/auth')(app, passport)
}

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/g5_auth/users/auth/g5')
  }
}
