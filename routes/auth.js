var cookieParser = require('cookie-parser')
module.exports = (app, passport, sucessRedirectPath) => {
  app.get('/g5_auth/users/auth/g5',
    passport.authenticate('oauth2'))

  app.get('/g5_auth/users/auth/g5/callback',
    passport.authenticate('oauth2', { failureRedirect: '/g5_auth/users/auth/g5' }),
    cookieParser(),
    function (req, res) {
      const { cookies } = req
      if (cookies.redirectPath) {
        res.redirect(cookies.redirectPath)
      } else {
        res.redirect(sucessRedirectPath)
      }
    })
}
