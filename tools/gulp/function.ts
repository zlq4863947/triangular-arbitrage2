export function getDeployPackageJson(): string {
  const pkg = require('../../package.json');

  const json = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    scripts: {
      start: 'node bundle.js',
    },
    dependencies: pkg.dependencies,
  };

  return JSON.stringify(json, null, 2);
}
