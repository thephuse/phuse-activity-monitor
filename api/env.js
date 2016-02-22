'use strict';

const fs = require('fs');

let config;

try {
  config = JSON.parse(fs.readFileSync(`${process.env.PWD}/config/default.json`));
} catch (e) {
  config = {};
}

const env = function(variable) {
  if (process.env && process.env[variable]) {
    return process.env[variable];
  } else if (config && config[variable]) {
    return config[variable];
  } else {
    return null;
  }
};

module.exports = env;
