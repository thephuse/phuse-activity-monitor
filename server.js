'use strict';

const Cache = require('node-cache');
const express = require('express');
const config = require('config');
const harvest = require('./api/harvest');
const port = 3000;
const app = express();
const ttl = config.get('ttl');

let cache = new Cache();

app.get("/people", function(req, res) {
  res.type('application/json');
  // TODO: abstract to pure function.
  harvest.get(`people`)(function(people) {
    cache.set('people', people, ttl.people);
    res.send(people);
  });
});

app.get("/times/:user/:from/:to", function(req, res) {
  res.type('application/json');
  if (cache.get('people')) {

  } else {
    // TODO: abstract to pure function.
    harvest.get(`people`)(function(people) {
      cache.set('people', people, ttl.people);
    }
  }
  harvest.get(`people/${req.user}/entries?from=${req.from}&to=${req.to}`)(res.send);
});

app.listen(port);
