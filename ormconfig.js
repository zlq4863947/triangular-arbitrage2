const config = require('config');

// used by typeorm cli
module.exports = {
  ...config.mysql,
  type: 'mysql',
  name: 'default',
  dropSchema: false,
  synchronize: false,
  migrationsRun: false,
  supportBigNumbers: true,
  bigNumberStrings: true,
  entities: ['dist/libs/ta2-libs/src/persistence/entity/**/*.entity.js'],
};
