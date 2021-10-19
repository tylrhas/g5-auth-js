const util = require('util')
const url = require('url')
const querystring = require('querystring')

module.exports = (app, passport, config) => {
  const { authenticate, defaultRedirectPath} = config
  const {
    domain,
    clientID
  } = config.passport
  app.get('/login', passport.authenticate('auth0', authenticate), function (req, res) {
    res.redirect('/')
  })

  app.get('/users/auth/auth0/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
      if (err) { return next(err) }
      if (!user) { return res.redirect('/login') }
      req.logIn(user, function (err) {
        if (err) { return next(err) }
        const returnTo = req.session.returnTo
        delete req.session.returnTo
        res.redirect(returnTo || defaultRedirectPath)
      })
    })(req, res, next)
  })

  app.get('/logout', (req, res) => {
    req.logout()

    let returnTo = req.protocol + '://' + req.hostname
    const port = req.connection.localPort
    if (port !== undefined && port !== 80 && port !== 443) {
      returnTo += ':' + port
    }
    const logoutURL = new url.URL(
      util.format('https://%s/v2/logout', domain)
    )
    const searchString = querystring.stringify({
      client_id: clientID,
      returnTo
    })
    logoutURL.search = searchString

    res.redirect(logoutURL)
  })
}
