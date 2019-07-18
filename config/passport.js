module.exports = function (passport, user, config, authMeEndpoint) {
  const User = user
  const OAuth2Strategy = require('passport-oauth2')
  const axios = require('axios')
    // placeholder for custom user serialization
    // null is for errors
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  // oauth 2 configuration for the passport strategy
  passport.use(new OAuth2Strategy(config, authenticate))

  async function authenticate(accessToken, refreshToken, profile, cb) {
    try {
      const url = authMeEndpoint
      const headers = { 'auth': { 'bearer': accessToken }}
      const {data: body} = await axios.get({ url, headers })
      const [ dbUser, created ] = await User.findOrCreate({ where: { email: body.email }, defaults: { token: accessToken, firstName: body.first_name, lastName: body.last_name, title: body.title, role: body.roles[0].name } })
      return cb(null, dbUser)
    } catch (err) {
      return cb(err, null)
    }
  }
}

