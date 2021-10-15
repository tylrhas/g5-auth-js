const passport = require('passport')
const session = require('express-session')
const jwksClient = require('jwks-rsa')
const jwt = require('jsonwebtoken')
let globalConfig = null
module.exports = {
  init,
  secured,
  models
}
/**
 *
 *
 * @param {*} app
 * @param {*} config
 */
function init(app, config) {
  globalConfig = config
  app.use(session(config.session))
  app.use(passport.initialize())
  app.use(passport.session())
  require('./config/passport')(passport, config.passport)
  require('./routes/auth')(app, passport, config)
}

function getTokenParams (req) {
  const bearerHeader = req.headers.authorization
  const bearer = bearerHeader.split(' ')
  const bearerToken = bearer[1]
  return [bearerToken, getKey, globalConfig.tokenSettings]
}

function verifyToken(req, res, next) {
  const params = getTokenParams(req)
  try {
    jwt.verify(...params, function (err, decoded) {
      if (err) {
        throw new Error(err)
      } else {
        req.decoded = decoded
        next()
      }
    })
  } catch (err) {
    res.status(403).send('Forbidden')
  }
}

function getKey(header, callback) {
  const client = jwksClient({
    jwksUri: `https://${globalConfig.passport.domain}/.well-known/jwks.json`
  })
  try {
    client.getSigningKey(header.kid, function(err, key) {
      if (err) {
        console.log(err)
      }
      const signingKey = key.publicKey || key.rsaPublicKey
      callback(null, signingKey)
    })
  } catch (e) {
    console.log(e)
  }
}
function secured (req, res, next) {
  if (typeof req.headers.authorization !== 'undefined') { 
    return verifyToken(req, res, next)
  } else if (req.user) {
    req.userRoles = req.user.roles.map((role) => {
      const { name, type, urn } = role
      return { name, type, urn }
    })
    return next()
  }
  req.session.returnTo = req.originalUrl
  res.redirect('/login')
}

function models(sequelize) {
  return require('./models/sync')(sequelize)
}

