const config = require('config');

console.log('config:', JSON.stringify(config));
module.exports = {
  ...config.mysql,
  name: 'default',
  dropSchema: false,
  synchronize: false,
  migrationsRun: false,
  supportBigNumbers: true,
  bigNumberStrings: true,
};
