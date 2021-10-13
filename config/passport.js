const models = require('../models')
module.exports = function (passport, config) {
const Auth0Strategy = require('passport-auth0')  // You can use this section to keep a smaller payload
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

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(config, authenticate)

passport.use(strategy)

async function authenticate (accessToken, refreshToken, extraParams, profile, done) {
  console.log({ profile })
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
    user.uppdate({
      auth0Id: profile.id,
    })
  } 
  // accessToken is the token to call Auth0 API (not needed in the most cases)
  // extraParams.id_token has the JSON Web Token
  // profile has all the information from the user
  return done(null, profile)
}

}
