const models = require('../models')

module.exports = function (passport, config) {
  const Auth0Strategy = require('passport-auth0')

  passport.serializeUser(function (user, done) {
    const { id } = user
    const email = user.emails[0].value
    const roles = user._json['https://getg5.com/roles']
    const firstName = user.name.givenName
    const lastName = user.name.familyName

    done(null, { id, email, firstName, lastName, roles })
  })

  passport.deserializeUser(function (user, done) {
    const { id } = user
    done(null, user)
  })

  const strategy = new Auth0Strategy(config, authenticate)
  passport.use(strategy)

  async function authenticate (accessToken, refreshToken, extraParams, profile, done) {
    const [user, created] = await models.user.findOrCreate({
      where: {
        email: profile.emails[0].value
      },
      defaults: {
        auth0Id: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      }
    })
    if (!created) {
      user.update({
        auth0Id: profile.id,
      })
    } 
    return done(null, profile)
  }
}
