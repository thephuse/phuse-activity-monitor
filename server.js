'use strict';

const express = require('express');
const port = 3000;
const app = express();
const stats = require('./api/stats.js');

app.use('/', express.static('static'))

// app.get("/people", stats.people);

app.get("/times/:from/:to", stats.times);

app.listen(port);
