const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = {
  env: env,
  secret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  db: 'mongodb://localhost:27017/colorbucket',
  unsecuredRoutes: ['/api/signup', '/api/login', '/api/password/recovery', '/api/password/update', '/api/colors/discover'],
  mailgun_domain: '',
  mailgun_key: '',
  port: 3010
};

const defaults = {
  root: path.join(__dirname, '/..')
};

module.exports = Object.assign(defaults, config);
