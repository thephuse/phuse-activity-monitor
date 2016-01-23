'use strict';
const request = require('request');
const config = require('config');
const url = require('url');
const harvestUrl = config.get('credentials.url');

const handle = function(callback) {
  return function(error, response, body) {
    if (!error) {
      callback(body);
    } else {
      throw new Error(error);
    }
  }
};

const get = function(endpoint, params) {
  let settings = {
    auth : {
      user : config.get('credentials.username'),
      pass : config.get('credentials.password')
    },
    headers: {
      'User-Agent' : 'request',
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
    }
  };
  return function() {
    let callback = arguments[arguments.length - 1];
    request.get(url.resolve(harvestUrl, endpoint), settings, handle(callback));
  }
};

module.exports = {
  get : get
};
