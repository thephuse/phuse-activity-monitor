'use strict';

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const OAuth2Strategy = require('passport-oauth2');

const env = require('./api/env');
const auth = require('./api/auth');
const stats = require('./api/stats');

const port = env('PORT');
const ip = env('IP');
const HARVEST = 'harvest';

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(auth.sessionParams));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));

passport.use(HARVEST, new OAuth2Strategy(auth.authCredentials, auth.verify));
passport.serializeUser(auth.serializeDeserialize);
passport.deserializeUser(auth.serializeDeserialize);

app.get('/', auth.ensureAuthenticated, (req, res) => {
  let file = (env('NODE_ENV') === 'production' ? 'index.dist.html' : 'index.html');
  res.sendFile(file, { root: './static' });
});

app.get('/auth/harvest', passport.authenticate(HARVEST));

app.get('/auth/harvest/callback', passport.authenticate(HARVEST, auth.authRedirect));

app.get('/forbidden', (req, res) => { res.status(403).send('Access Forbidden'); });

app.get('/times/:from/:to', auth.ensureEndpointAuthenticated, stats.times);

app.get('/logout', auth.logout);

app.listen(port, ip);
