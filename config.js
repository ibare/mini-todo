var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: {
      uri: 'mongodb://localhost:27017/todo',
      user: '',
      password: ''
    }
  },
  production: {
    db: {
      uri: 'mongodb://localhost:27017/todo',
      user: 'user',
      password: 'password'
    }
  }
}
