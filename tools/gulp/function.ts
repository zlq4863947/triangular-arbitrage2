const requiredPackages = ['log4js', 'config', 'toml'];
export function getDeployPackageJson(pkgName?: string): string {
  const pkg = require('../../package.json');
  const dependencies = {} as any;
  Object.keys(pkg.dependencies)
    .filter((key) => requiredPackages.includes(key))
    .forEach((key) => (dependencies[key] = pkg.dependencies[key]));
  const json = {
    name: pkgName,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    scripts: {
      start: 'pm2 start pm2.config.js',
      stop: 'pm2 stop pm2.config.js',
      restart: 'pm2 restart pm2.config.js',
      reload: 'pm2 restart pm2.config.js',
      delete: 'pm2 restart pm2.config.js',
      'docker:up': 'docker-compose -f ./docker-compose.yml up -d',
      'docker:down': 'docker-compose -f ./docker-compose.yml down',
    },
    dependencies,
  };

  return JSON.stringify(json, null, 2);
}
