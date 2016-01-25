const config = require('config');

const env = function(variable) {
  if (process.env && process.env[variable]) {
    return process.env[variable];
  } else if (config.get(variable)) {
    return config.get(variable);
  } else {
    return null;
  }
};

module.exports = env;
