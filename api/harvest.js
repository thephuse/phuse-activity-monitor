'use strict';

const Cache = require('node-cache');
const request = require('request');
const url = require('url');
const env = require('./env');

const harvestUrl = env('HARVEST_WEBADDRESS');
let cache = new Cache();

const globalSettings = function() {
  return {
    auth : {
      user : env('HARVEST_USERNAME'),
      pass : env('HARVEST_PASSWORD')
    },
    headers: {
      'User-Agent' : 'request',
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    }
  }
};

const handle = function(callback, endpoint) {
  return function(error, response, body) {
    if (!error) {
      let data = JSON.parse(body);
      cache.set(endpoint, data, env('TTL'));
      return callback(data);
    } else {
      throw new Error(error);
    }
  }
};

const get = function(endpoint, params) {
  let settings = globalSettings();
  let endpointUrl = url.resolve(harvestUrl, endpoint);
  let cached = cache.get(endpoint);

  return function(callback) {
    if (cached) {
      return callback(cached);
    } else {
      return request.get(endpointUrl, settings, handle(callback, endpoint));
    }
  }
};

module.exports = {
  get : get
};
