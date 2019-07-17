const models = require('./models')
const passport = require('passport')
module.exports = {
  init,
  isAuthenticated
}

function init(app) {
  app.use(passport.initialize())
  app.use(passport.session())
  require('./config/passport')(passport, models.user)
  require('./routes/auth')(app, passport)
}

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/g5_auth/users/auth/g5')
  }
}
