'use strict';

const express = require('express');
const port = 3000;
const ip = '0.0.0.0';
const app = express();
const stats = require('./api/stats.js');

app.use('/', express.static('static'));

app.get("/times/:from/:to", stats.times);

app.listen(port, ip);
