const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'master'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/itunse-master-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'master'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/master-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'master'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/master-production'
  }
};

module.exports = config[env];
