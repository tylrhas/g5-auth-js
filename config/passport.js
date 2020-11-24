const models = require('../models')

module.exports = function (passport, user, config, authMeEndpoint) {
  const User = user
  const OAuth2Strategy = require('passport-oauth2')
  const axios = require('axios')
    // placeholder for custom user serialization
    // null is for errors
  passport.serializeUser((user, done) => {
    console.log('serializeUser')
    console.log({ user })
    done(null, user)
  })
  passport.deserializeUser((user, done) => {
    console.log('deserializeUser')
    console.log({ user })
    done(null, user)
  })

  // oauth 2 configuration for the passport strategy
  passport.use(new OAuth2Strategy(config, authenticate))

  async function authenticate(token, refreshToken, profile, cb) {
    console.log('authenticate')
    try {
      const url = authMeEndpoint
      debugger
      const headers = {
        Authorization: `Bearer ${accessToken}`
      }
      const { data: body } = await axios.get(url, { headers })
      const { roles,  accessible_applications, first_name: firstName, last_name: lastName, title: role, email } = body
      console.log({ body, roles, accessible_applications })
      const [ dbUser, created ] = await User.findOrCreate({
        where: { email },
        defaults: { token, firstName, lastName, role }
      })
      if (!created) {
        await dbUser.update({ firstName, lastName, role })
      }
      const userId = dbUser.dataValues.id
      await models.roles.destroy({ where: { userId }})
      for (let i = 0; i < roles.length; i++) {
        const { name, type, urn } = roles[i]
        await models.roles.create({ userId, name, type, urn })
      }
      return cb(null, dbUser)
    } catch (err) {
      return cb(err, null)
    }
  }
}
