'use strict';

const env = require('./env');

const sessionParams = {
  saveUninitialized: true,
  resave: true,
  secret: env('SECRET_SESSION'),
  cookie: {
    maxAge: 60 * 60 * 24 * 365
  }
};

const authCredentials = {
  authorizationURL: `${env('HARVEST_WEBADDRESS')}/oauth2/authorize`,
  callbackURL: `${env('ROOT_URL')}/auth/harvest/callback`,
  tokenURL: `${env('HARVEST_WEBADDRESS')}/oauth2/authorize`,
  clientID: env('HARVEST_CLIENTID'),
  clientSecret: env('HARVEST_SECRET')
};

const authRedirect = {
  successRedirect: 'pam://auth',
  failureRedirect: '/forbidden'
}

const verify = function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
};

const serializeDeserialize = function(user, done) {
  done(null, user);
};

const ensureEndpointAuthenticated = function(req, res, next) {
  return (req.isAuthenticated()) ? next() : res.status(403).json({"success": false, "reason": "Access Forbidden", "cookie": req.headers.cookie});
};

const logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = {
  sessionParams,
  authCredentials,
  authRedirect,
  verify,
  serializeDeserialize,
  ensureEndpointAuthenticated,
  logout
};
