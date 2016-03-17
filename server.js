'use strict';

//const newrelic = require('newrelic');
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

app.set('view engine', 'jade');

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

app.get('/', auth.ensureEndpointAuthenticated, (req, res) => { res.json({"success": true}) });

app.get('/auth/harvest', passport.authenticate(HARVEST));

app.get('/auth/harvest/callback', passport.authenticate(HARVEST), (req, res) => { res.redirect('/authenticated'); });

app.get('/authenticated', (req, res) => { res.redirect(`/authenticated/success/?cookie=${req.headers.cookie}`) });

app.get('/authenticated/success', (req, res) => { res.json({"success": true}) });

app.get('/forbidden', (req, res) => { res.status(403).json({"success": false, "reason": "Access Forbidden", "cookie": req.headers.cookie}); });

app.get('/times/:from/:to', auth.ensureEndpointAuthenticated, stats.times);

app.get('/logout', auth.logout);

app.listen(port, ip);
