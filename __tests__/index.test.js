require('dotenv').config()
const models = require('./config/models')
const express = require('express')
const app = express()
const {
  G5_AUTH_ENDPOINT: authorizationURL,
  G5_TOKEN_ENDPOINT: tokenURL,
  G5_AUTH_CLIENT_ID: clientID,
  G5_AUTH_CLIENT_SECRET: clientSecret,
  G5_AUTH_REDIRECT_URI: callbackURL,
  SESSION_SECRET: secret
} = process.env
const authConfig = {
  passport: {
    authorizationURL,
    tokenURL,
    clientID,
    clientSecret,
    callbackURL
  },
  session: {
    secret
  }
}
describe('Add Routes and Tables', () => {
  beforeAll(() => {
    require('../index').init(app, models, authConfig)
  })
  describe('Models', () => {
    test('user', () => {
      expect(models).toHaveProperty('user')
    })
  })
  describe('Routes', () => {
    test('/g5_auth/users/auth/g5', () => {
      const route = app._router.stack[app._router.stack.length - 2].route.path
      expect(route).toBe('/g5_auth/users/auth/g5')
    })
    test('/g5_auth/users/auth/g5/callback', () => {
      const route = app._router.stack[app._router.stack.length - 1].route.path
      expect(route).toBe('/g5_auth/users/auth/g5/callback')
    })
  })
})

describe('Add Routes and Tables', () => {
  test('Authenticated True', () => {
    const req = {}
    const res = {}
    const next = jest.fn()
    req.isAuthenticated = jest.fn(() => true )
    const auth = require('../index').isAuthenticated(req, res, next)
    expect(next).toHaveBeenCalled()
  })
  test('Authenticated False', () => {
    const req = {}
    const res = {}
    res.redirect = jest.fn()
    const next = jest.fn()
    req.isAuthenticated = jest.fn(() => false )
    const auth = require('../index').isAuthenticated(req, res, next)
    expect(next).not.toHaveBeenCalled()
    expect(res.redirect).toHaveBeenCalledWith('/g5_auth/users/auth/g5')
  })
})